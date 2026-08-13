# Content & Copy

Ready-to-use draft copy for every section, pulled directly from the CV and rewritten for the voice described in `01-concept-and-narrative.md`. Every technical detail, dataset name, metric, and date below is sourced from the CV — nothing invented. Treat this as a strong first draft to drop into the build and personalize further, not as final, untouchable marketing copy.

## Hero

**Eyebrow:** Machine Learning Engineer · Audio & Signal Processing
**Name:** Maaz Saeed
**Tagline:** I teach machines to see what we hear.
**Supporting line:** Deep learning engineer specializing in spectrogram-based audio understanding — sound event detection, speech enhancement, and audio compression — currently at Fraunhofer IDMT.
**Scroll cue:** Scroll — watch a sound become visible ↓

## Manifesto

Sound is invisible until you know how to look at it. I work at the intersection of audio signal processing and computer vision — converting sound into spectrograms, then training neural networks to detect, localize, and separate events inside them. The same way a vision model finds a cat in a photo, mine finds a gunshot in a city recording, or a whale call in an ocean dataset.

## Status line

Use this near Scene 7 (Now/Contact), styled in the monospace/terminal voice:

`// status: thesis_mode — Fraunhofer IDMT — since Jul 2026`

## Experience

### M.Sc. Thesis — Fraunhofer IDMT
**Jul 2026 – Present**

`[PLACEHOLDER — exact thesis title not yet provided. Likely continues the sound-event-detection-via-vision-models thread from the Working Student role below; confirm and replace before launch.]`

Interim one-line status card, usable in the timeline until the full entry is ready:
*"Currently starting my M.Sc. thesis at Fraunhofer IDMT — details soon."*

### Working Student, Deep Learning / Audio ML — Fraunhofer IDMT
**Jan 2026 – Jun 2026**
**Sound Event Detection via Vision Models**

What if you could *see* a gunshot, a whale call, or a car horn — not just hear it? I reframed sound event detection as an object-detection problem: converting audio into spectrograms and applying YOLO-based models to localize events in time and frequency, the same way a vision model finds an object in a photo. I built the deep learning pipelines in PyTorch end to end, working across acoustic and bioacoustic datasets — DESED's urban soundscapes, Amazon Basin recordings, whale vocalizations — and ran systematic experiments across YOLO, ATST, and BEATs architectures to compare robustness, inference efficiency, and detection performance. Everything trained on dedicated GPU infrastructure with reproducible, Git-versioned pipelines. The work is feeding into a BioDCASE challenge entry and a DCASE workshop paper.

**Tech:** Python · PyTorch · YOLO · ATST · BEATs

### Research Project Student — Fraunhofer IDMT
**Jun 2025 – Dec 2025**
**Foreground & Background Sound Event Detection in Complex Acoustic Scenes**

Real-world audio is messy — a foreground event always competes with background noise. I built an end-to-end pipeline, from preprocessing through training to evaluation, comparing CNNs against Audio Spectrogram Transformers. Through data-centric optimization — SpecAugment, grid distortion, and K-fold cross-validation for robust evaluation — I pushed mean average precision from **0.37 to 0.41**, then documented every experiment to keep the research reproducible.

**Tech:** Python · PyTorch · AST · VGG · Transformers · SpecAugment

## Lab Notebook (academic projects)

### Neural Audio Codecs (Audio Compression)
**Oct 2025 – Apr 2026 · Technische Universität Ilmenau**

How much can you compress sound before it stops sounding human? I benchmarked modern neural audio codecs — EnCodec, Stable Codec, and Efficient Speech Coding — across compression ratio, reconstruction quality, and latency, mapping the real trade-offs for low-latency speech and audio systems.

**Tech:** EnCodec · Transformers · Stable Codec

### Blind Source Separation
**Apr 2025 – Oct 2025 · Technische Universität Ilmenau**

Given a mixed recording, can you isolate one voice in the chaos? I compared classical Independent Component Analysis against modern SepFormer-based deep learning models, evaluating separation quality with SI-SDR and SDR, and mapping where added model complexity stops paying for itself.

**Tech:** PyTorch · ICA · SepFormer · FastMNMF · Trinicon

### Speech Enhancement via Audio Denoising (U-Net)
**Oct 2024 – Apr 2025 · Technische Universität Ilmenau**

I built a spectrogram-based U-Net that strips noise out of speech — a hybrid DSP + ML pipeline (STFT in, ISTFT out) designed from day one for low-latency inference, then optimized to run on edge devices via TFLite.

**Tech:** TensorFlow · Python · U-Net · TFLite · Speech Enhancement

## Instrumentation (skills)

Group these as labeled clusters in the spectrum-analyzer visualization (see `03-design-system.md` and `05-scene-storyboard.md`) rather than a flat tag cloud:

- **Programming & ML** — Python, C++, PyTorch, TensorFlow
- **ML & DL Models** — Transformers, CNNs, RNNs, Hybrid architectures
- **Audio & DSP** — Librosa, Mel Spectrograms, MFCC, LEAF, PCEN, STFT/ISTFT
- **Tools** — ONNX, LiteRT (TFLite), OpenCV
- **Core Areas** — Hyperparameter Optimisation, Experiment Design, Model Benchmarking, Data Augmentation

## Education

**M.Sc. Research in Media Engineering** — Technical University Ilmenau, Germany — Apr 2024 – Present
**B.S. Information Technology** — International Islamic University, Pakistan — Sep 2017 – Aug 2021

## Languages

English — C1 (Fluent) · German — A2 (Beginner)

## Certificates

The Complete Python Bootcamp · Deep Learning A-Z

*(These read a little generic next to the rest of the CV's depth. Recommendation: fold them into the downloadable resume PDF only, and leave them off the main scroll — they're not pulling visual weight next to named datasets and a mAP improvement.)*

## Contact / Outro

**Heading:** Let's talk about sound, signal, or what's next.
**Body:** Based in Ilmenau, Germany. Reach out directly, or find the code on GitHub.
**Email:** maazsaeed61998@gmail.com
**Phone:** +49 176 56897279
**LinkedIn:** `[PLACEHOLDER — URL not recoverable from the CV PDF text; add the actual profile link]`
**GitHub:** `[PLACEHOLDER — URL not recoverable from the CV PDF text; add the actual profile link]`
**Location:** Ilmenau, Germany
**Resume download:** link to a PDF version of the CV, for recruiters who want the dense version alongside the story
