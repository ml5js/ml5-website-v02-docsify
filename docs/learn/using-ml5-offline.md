# Using ml5.js Offline

<br/>

> 🧪 **New & experimental.** Offline support is landing in ml5.js. The APIs described here are being finalized — expect small changes, and please share feedback on [Discord](https://discord.com/invite/3CVauZMSt7) or [GitHub](https://github.com/ml5js/ml5-next-gen).

ml5.js normally downloads its pre-trained models from the cloud the first time your sketch runs. That's perfect for everyday tinkering, but it falls apart in the places creative coders love to put their work: a gallery installation behind a flaky network, a classroom with no Wi‑Fi, a kiosk that has to boot cold, or an air‑gapped machine that never touches the open internet.

The fix is to **keep the model files next to your sketch** and tell ml5.js to load them from there instead of the internet. ml5.js is adding a `modelPath` option to do exactly that. This post walks through setting it up by hand first — so you understand what's going on — and then shows the new `ml5 cache` command-line tool that automates the whole thing.

?> Offline loading currently supports the three MediaPipe-based models: **HandPose**, **FaceMesh**, and **BodyPose**. More models are planned.

---

## The core idea: `modelPath`

When you create a model, pass a `modelPath` pointing at a local folder of model files:

```javascript
const handPose = ml5.handPose({ modelPath: "./ml5-models/handpose" });
```

With that one option, ml5.js resolves the model from disk and never reaches out to the network. The only work left is getting those files onto disk in the right layout — which you can do manually (below) or with the CLI (further down).

?> **Point `modelPath` at the model root** (e.g. `./ml5-models/handpose`), not at a runtime subfolder like `./ml5-models/handpose/tfjs`. ml5.js gives you a clear error if it's pointed at the wrong level.

---

## Setting it up manually

Let's do it by hand with **HandPose** as the example. The same shape applies to FaceMesh and BodyPose.

### Step 1 — Decide on a folder layout

You'll end up with a `ml5-models/` folder sitting next to your sketch. ml5.js supports two runtimes — **TFJS** (recommended if you're unsure; usually fewer files) and **MediaPipe** — and you only need the files for the one you choose:

```text
my-sketch/
  index.html
  sketch.js
  ml5-models/
    handpose/
      tfjs/                 ← TFJS runtime (recommended)
        detector/
          model.json
          group*.bin
        landmark/
          model.json
          group*.bin
      mediapipe/            ← OR the MediaPipe runtime
        hands.binarypb
        hands.js
        hand_landmark_full.tflite
        ...
```

### Step 2 — Download the files (TFJS path)

Create the two folders `ml5-models/handpose/tfjs/detector/` and `ml5-models/handpose/tfjs/landmark/`, then download the two `model.json` files into them:

- [Detector model.json](https://tfhub.dev/mediapipe/tfjs-model/handpose_3d/detector/full/1/model.json?tfjs-format=file) → `ml5-models/handpose/tfjs/detector/model.json`
- [Landmark model.json](https://tfhub.dev/mediapipe/tfjs-model/handpose_3d/landmark/full/1/model.json?tfjs-format=file) → `ml5-models/handpose/tfjs/landmark/model.json`

Each `model.json` lists the weight files it needs. Open it in a text editor, find the `weightsManifest` section, and download every `.bin` file named under `paths`. Save each `.bin` in the **same folder** as the `model.json` that referenced it.

?> Prefer the MediaPipe runtime? Download the MediaPipe asset bundle (`hands.binarypb`, the `.wasm` / `.data` / `.js` files, and a `hand_landmark_*.tflite`) into `ml5-models/handpose/mediapipe/` instead, and load it with `ml5.handPose({ runtime: "mediapipe", modelPath: "./ml5-models/handpose" })`. The full file list lives in the [manual setup guides](https://github.com/ml5js/ml5-next-gen/tree/main/docs/manual-model-setup).

### Step 3 — Point your sketch at the files

```javascript
let handPose;

function preload() {
  handPose = ml5.handPose({ modelPath: "./ml5-models/handpose" });
}
```

### Step 4 — Run with a local server

Don't open `index.html` with `file://` — `modelPath` resolves over `http(s)://`, so you need a local server. A few friendly options:

**Live Server (VS Code extension)** — the easiest for most people:

1. Install the [**Live Server**](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension by Ritwick Dey from the VS Code Extensions panel.
2. Open your sketch folder in VS Code.
3. Click **Go Live** in the status bar (bottom-right), or right-click `index.html` → **Open with Live Server**.
4. Your browser opens at `http://127.0.0.1:5500` and reloads automatically when you save.

**Python's built-in server** — if you'd rather use the terminal, run this from the sketch folder:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`. The p5.js web editor works too, since it serves your files over `http`.

### Step 5 — Verify it's truly offline

Open DevTools → **Network**, reload, and confirm the model files load from `localhost`. They should **not** come from `cdn.jsdelivr.net`, `tfhub.dev`, or `storage.googleapis.com`. If those domains don't appear, your sketch is running fully offline. 🎉

---

## The faster way: the `ml5 cache` CLI

Doing the above by hand means hunting down filenames, reading the `weightsManifest`, and getting the folder layout exactly right. The new `ml5 cache` command-line tool does all of that for you — it downloads every required file into the correct layout and writes a `manifest.json` with SHA‑256 hashes so the asset set is verifiable.

```bash
# Download a model's files into ./ml5-models/handpose
npx ml5 cache prefetch handpose

# Check the files on disk still match the manifest
npx ml5 cache verify handpose

# See what's been cached
npx ml5 cache list
```

Once it finishes, point your sketch at the folder exactly as before:

```javascript
const handPose = ml5.handPose({ modelPath: "./ml5-models/handpose" });
```

Because the CLI runs **ahead of time**, the very first run of your sketch is already offline — no first-online warmup needed. And because it produces a versioned, hashable `manifest.json`, you can check the model files into your project and know you're running the exact same weights every time. For installations, kiosks, CI, and air-gapped machines, this is the recommended path.

?> **No Node available?** (Chromebooks, the p5.js web editor, locked-down classroom machines.) The manual steps above are your fallback. Whenever you *can* run Node, prefer `npx ml5 cache prefetch` — it absorbs all the fiddly parts.

---

## A note on in-browser caching (experimental)

> ⚠️ **Experimental — not recommended for anything you can't afford to break.** There's an early, separate option that stores models in the browser instead of on disk: passing `{ cache: true }` saves the model to the browser's storage after its first download, so later visits load from that copy. It's convenient for public web sketches, but it is **not** a substitute for the `modelPath` workflow above, and it comes with real caveats you should understand before relying on it.

```javascript
handPose = ml5.handPose({ cache: true }); // experimental
```

**Why it isn't the path we recommend for offline installations:**

- **It still needs the internet at least once.** The first load downloads from the cloud to warm the cache. A machine that boots offline for the very first time has nothing cached — so it fails. `modelPath` files, by contrast, are on disk before the sketch ever runs.
- **The browser can wipe it at any time.** Cached models live in browser storage (IndexedDB), which the browser is free to evict under storage pressure, in private/incognito windows, or when the user clears site data. An installation that worked yesterday can silently re-download (or break) today.
- **It's per-browser and per-origin.** The cache doesn't travel with your project. A different browser, a different machine, a fresh profile, or a different URL all start cold. You can't check it into your repo or copy it onto a kiosk.
- **No verification or version pinning.** Unlike the CLI's hashable `manifest.json`, there's no way to confirm *which* model bytes are cached or that they haven't changed. You don't get reproducibility.
- **Quotas and eviction are opaque.** Storage limits vary by browser and device, and eviction order isn't something you control — so behavior on a locked-down classroom or gallery machine is hard to predict.

**The short version:** treat `cache: true` as a nice-to-have speedup for repeat visitors on the open web — *"usually works offline once it's been opened once."* For anything that must be dependable from a cold boot — installations, exhibitions, kiosks, classrooms, CI, air-gapped machines — use `modelPath` with the manual setup or the `ml5 cache` CLI above. As this feature matures, the goal is to let the two work together automatically, but until then, don't lean on in-browser caching for offline-critical work.

---

## Learn more {docsify-ignore}

- `ml5 cache` CLI + `modelPath` — [ml5-next-gen #305](https://github.com/ml5js/ml5-next-gen/pull/305)
- In-browser caching (experimental) — [ml5-next-gen #304](https://github.com/ml5js/ml5-next-gen/pull/304)
- Questions, ideas, or want to help test offline mode? Join us on [Discord](https://discord.com/invite/3CVauZMSt7).

<br>
