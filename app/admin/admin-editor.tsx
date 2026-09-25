"use client";

import { ChangeEvent, useEffect, useMemo, useState } from "react";
import type { PortfolioContent } from "../portfolio-content";

type Field = { key: string; label: string; long?: boolean };
type CollectionKey = "projects" | "trainings" | "designWorks" | "downloads" | "relations" | "experiences";

const collectionFields: Record<CollectionKey, Field[]> = {
  projects: [{ key: "category", label: "Category" }, { key: "title", label: "Title" }, { key: "summary", label: "Summary", long: true }, { key: "role", label: "Your role" }, { key: "result", label: "Result" }, { key: "logo", label: "Logo / image URL" }],
  trainings: [{ key: "eyebrow", label: "Label" }, { key: "title", label: "Title" }, { key: "text", label: "Description", long: true }, { key: "image", label: "Cover image URL" }, { key: "href", label: "File URL" }, { key: "meta", label: "Details (one per line)", long: true }],
  designWorks: [{ key: "title", label: "Title" }, { key: "type", label: "Type" }, { key: "src", label: "Image URL" }],
  downloads: [{ key: "type", label: "File type" }, { key: "title", label: "Title" }, { key: "details", label: "Details" }, { key: "href", label: "File URL" }],
  relations: [{ key: "name", label: "Organization" }, { key: "src", label: "Logo URL" }],
  experiences: [{ key: "period", label: "Period" }, { key: "role", label: "Role" }, { key: "company", label: "Organization" }, { key: "summary", label: "Summary", long: true }],
};

export function AdminEditor({
  ownerName,
  initialContent,
  initialUpdatedAt,
  initialLoadError = false,
}: {
  ownerName: string;
  initialContent: PortfolioContent;
  initialUpdatedAt: number | null;
  initialLoadError?: boolean;
}) {
  const [content, setContent] = useState<PortfolioContent>(initialContent);
  const [status, setStatus] = useState(
    initialLoadError
      ? "Your saved content could not be loaded."
      : initialUpdatedAt
        ? "Saved content loaded. Ready to edit."
        : "Ready — no edits have been published yet.",
  );
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [tab, setTab] = useState<"site" | CollectionKey>("site");
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState("");

  useEffect(() => {
    if (!dirty) return;
    const warnAboutUnsavedChanges = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", warnAboutUnsavedChanges);
    return () => window.removeEventListener("beforeunload", warnAboutUnsavedChanges);
  }, [dirty]);

  const tabs = useMemo(() => [
    ["site", "Site settings"], ["projects", "Projects"], ["trainings", "Training"], ["designWorks", "Design work"], ["downloads", "Downloads"], ["relations", "Relationships"], ["experiences", "Experience"],
  ] as const, []);

  function markDirty() {
    setDirty(true);
    setStatus("You have unpublished changes.");
  }

  function updateSite(key: keyof PortfolioContent["site"], value: string) { markDirty(); setContent((current) => ({ ...current, site: { ...current.site, [key]: value } })); }
  function updateTheme(key: keyof PortfolioContent["theme"], value: string) { markDirty(); setContent((current) => ({ ...current, theme: { ...current.theme, [key]: value } })); }
  function updateArray(key: CollectionKey, index: number, field: string, value: string) {
    markDirty();
    setContent((current) => {
      const items = [...current[key]] as Record<string, unknown>[];
      items[index] = { ...items[index], [field]: field === "meta" ? value.split("\n").filter(Boolean) : value };
      return { ...current, [key]: items } as PortfolioContent;
    });
  }
  function removeItem(key: CollectionKey, index: number) { markDirty(); setContent((current) => ({ ...current, [key]: current[key].filter((_, itemIndex) => itemIndex !== index) } as PortfolioContent)); }
  function addItem(key: CollectionKey) {
    const presets: Record<CollectionKey, Record<string, unknown>> = {
      projects: { number: String(content.projects.length + 1).padStart(2, "0"), category: "New project", title: "New project title", summary: "Describe the project and its impact.", role: "Your role", result: "Result", className: "project-card" },
      trainings: { eyebrow: "Training program", title: "New training program", text: "Program description", image: "", meta: ["Designed & delivered"], href: "" },
      designWorks: { src: "", title: "New design", type: "Design work", className: "design-item design-tall" },
      downloads: { type: "PDF", title: "New file", details: "Description", href: "" },
      relations: { name: "New organization", src: "" },
      experiences: { period: "Year — Year", role: "Role", company: "Organization", summary: "Describe the role and contribution." },
    };
    markDirty();
    setContent((current) => ({ ...current, [key]: [...current[key], presets[key]] } as PortfolioContent));
  }
  async function save() {
    if (!dirty || saving) return;
    setSaving(true); setStatus("Saving your changes…");
    try {
      const response = await fetchWithTimeout("/api/admin/content", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ content }), cache: "no-store", credentials: "same-origin" }, 15_000);
      const payload = await response.json().catch(() => null) as { error?: string; updatedAt?: number } | null;
      if (!response.ok || !payload?.updatedAt) throw new Error(payload?.error ?? "Save failed");
      setDirty(false);
      setStatus(`Published successfully at ${new Date(payload.updatedAt).toLocaleTimeString()}.`);
    } catch (error) {
      setStatus(error instanceof DOMException && error.name === "AbortError" ? "Saving took too long and was cancelled. Your changes are still on this page — try again." : "Could not publish your changes. They are still on this page — try again.");
    }
    finally { setSaving(false); }
  }
  async function upload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]; if (!file) return;
    if (file.size > 25_000_000) { setStatus("Choose a file smaller than 25 MB."); event.target.value = ""; return; }
    setUploading(true); setStatus("Uploading file…");
    try {
      const form = new FormData(); form.append("file", file);
      const response = await fetchWithTimeout("/api/admin/upload", { method: "POST", body: form, credentials: "same-origin" }, 60_000);
      const payload = await response.json().catch(() => null) as { error?: string; url?: string } | null;
      if (!response.ok || !payload?.url) throw new Error(payload?.error ?? "Upload failed");
      setUploadedUrl(payload.url);
      try {
        await navigator.clipboard.writeText(payload.url);
        setStatus("File uploaded. Its link was copied — paste it into the relevant field, then publish your changes.");
      } catch {
        setStatus("File uploaded. Copy the link shown below, paste it into the relevant field, then publish your changes.");
      }
    } catch (error) {
      setStatus(error instanceof DOMException && error.name === "AbortError" ? "The upload timed out. Try again on a stable connection." : "Upload failed. Use a file under 25 MB and try again.");
    }
    finally { setUploading(false); event.target.value = ""; }
  }

  if (initialLoadError) {
    return <main className="admin-shell">
      <header className="admin-header"><div><p>Portfolio control panel</p><h1>Welcome, {ownerName}</h1></div><a href="https://mohammed-alosaimi.pages.dev/" target="_blank" rel="noreferrer">View public site ↗</a></header>
      <section className="admin-load-error" role="alert"><p>Connection problem</p><h2>Your saved content is safe, but the editor could not load it.</h2><span>Refresh the panel before making changes. The editor will not let an unavailable saved version be overwritten.</span><a href="/admin">Retry loading</a></section>
    </main>;
  }

  return <main className="admin-shell">
    <header className="admin-header"><div><p>Portfolio control panel</p><h1>Welcome, {ownerName}</h1></div><a href="https://mohammed-alosaimi.pages.dev/" target="_blank" rel="noreferrer">View public site ↗</a></header>
    <section className="admin-intro"><div><h2>Update your portfolio without code</h2><p>Edit a field, upload a file when needed, then select <strong>Publish changes</strong>. Your last saved version remains available until you publish again.</p>{uploadedUrl && <div className="upload-result"><label>Latest uploaded link<input value={uploadedUrl} readOnly /></label><button type="button" onClick={() => navigator.clipboard.writeText(uploadedUrl).then(() => setStatus("Link copied.")).catch(() => setStatus("Select and copy the link manually."))}>Copy link</button></div>}</div><label className="upload-button">{uploading ? "Uploading…" : "Upload image or file"}<input type="file" onChange={upload} accept="image/*,video/*,.pdf" disabled={uploading}/></label></section>
    <div className="admin-layout"><aside className="admin-tabs">{tabs.map(([key, label]) => <button type="button" className={tab === key ? "active" : ""} onClick={() => setTab(key)} key={key}>{label}</button>)}</aside><section className="admin-panel">{tab === "site" ? <SiteSettings content={content} updateSite={updateSite} updateTheme={updateTheme} /> : <CollectionEditor collection={tab} items={content[tab] as Record<string, unknown>[]} fields={collectionFields[tab]} onChange={updateArray} onRemove={removeItem} onAdd={addItem} />}</section></div>
    <footer className="admin-footer"><p role="status" aria-live="polite">{status}</p><button type="button" className="publish-button" disabled={saving || !dirty} onClick={save}>{saving ? "Publishing…" : dirty ? "Publish changes" : "Up to date"}</button></footer>
  </main>;
}

async function fetchWithTimeout(input: RequestInfo | URL, init: RequestInit, timeoutMs: number) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), timeoutMs);
  try { return await fetch(input, { ...init, signal: controller.signal }); }
  finally { window.clearTimeout(timeout); }
}

function SiteSettings({ content, updateSite, updateTheme }: { content: PortfolioContent; updateSite: (key: keyof PortfolioContent["site"], value: string) => void; updateTheme: (key: keyof PortfolioContent["theme"], value: string) => void }) {
  return <><div className="admin-panel-heading"><p>Core settings</p><h2>Identity and first impression</h2></div><div className="field-grid">{(["name", "portfolioLabel", "eyebrow", "role", "email", "location", "heroImage"] as const).map((key) => <Field key={key} label={labelFor(key)} value={content.site[key]} onChange={(value) => updateSite(key, value)} long={key === "eyebrow"}/>)}</div><Field label="Introduction" value={content.site.intro} onChange={(value) => updateSite("intro", value)} long/><div className="admin-panel-heading compact"><p>Brand colors</p><h2>Visual theme</h2></div><div className="color-grid">{(["background", "surface", "accent", "text"] as const).map((key) => <label key={key}>{labelFor(key)}<span><input type="color" value={content.theme[key]} onChange={(event) => updateTheme(key, event.target.value)}/><input value={content.theme[key]} onChange={(event) => updateTheme(key, event.target.value)} /></span></label>)}</div></>;
}

function CollectionEditor({ collection, items, fields, onChange, onRemove, onAdd }: { collection: CollectionKey; items: Record<string, unknown>[]; fields: Field[]; onChange: (collection: CollectionKey, index: number, field: string, value: string) => void; onRemove: (collection: CollectionKey, index: number) => void; onAdd: (collection: CollectionKey) => void }) {
  return <><div className="admin-panel-heading"><p>{collection.replace(/([A-Z])/g, " $1")}</p><h2>Manage content</h2><button type="button" className="add-button" onClick={() => onAdd(collection)}>+ Add item</button></div><div className="editor-list">{items.map((item, index) => <article className="editor-card" key={index}><div className="editor-card-top"><strong>Item {index + 1}</strong><button type="button" onClick={() => onRemove(collection, index)}>Remove</button></div><div className="field-grid">{fields.map((field) => <Field key={field.key} label={field.label} value={Array.isArray(item[field.key]) ? (item[field.key] as string[]).join("\n") : String(item[field.key] ?? "")} onChange={(value) => onChange(collection, index, field.key, value)} long={field.long}/>)}</div></article>)}</div></>;
}

function Field({ label, value, onChange, long = false }: { label: string; value: string; onChange: (value: string) => void; long?: boolean }) {
  return <label className={long ? "wide" : ""}>{label}{long ? <textarea value={value} onChange={(event) => onChange(event.target.value)}/> : <input value={value} onChange={(event) => onChange(event.target.value)}/>}</label>;
}

function labelFor(value: string) { return value.replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase()); }
