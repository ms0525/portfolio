// Projects — two flagship case studies (Scenes 3 & 4) and three lighter
// "lab notebook" academic projects (Scene 5). Sourced from 02-content-copy.md.

export const flagship = [
  {
    id: 'sed-vision',
    title: 'Sound Event Detection via Vision Models',
    kicker: 'Working Student · Fraunhofer IDMT',
    // datasets double as the "detected" labels drawn on the spectrogram (Scene 3)
    datasets: ['DESED', 'Amazon Basin', 'Whale vocalization'],
    narrative: [
      'Reframed sound event detection as object detection — audio becomes a spectrogram, then models localize events in time and frequency.',
      'Fine-tuned YOLOv11 and RT-DETR on log-Mel spectrograms and benchmarked them against BEATs and ATST audio transformers.',
      'Designed task-aligned post-processing — NMS tuning, aspect-ratio filtering, box merging — the beat that lifts RT-DETR past the transformer baselines.',
    ],
    tech: ['Python', 'PyTorch', 'YOLO', 'ATST', 'BEATs'],
    callout: 'DCASE workshop paper in progress.',
    // Whale-call SED (BioDCASE task 2): event-level, micro-averaged F1 (1D IoU).
    // BEATs is the strongest base model; a simple NMS post-processing step lifts
    // RT-DETR past it. Values from the technical report.
    metric: {
      label: 'micro-averaged F1 · event-level',
      min: 0.4,
      max: 0.7,
      results: [
        { tag: 'RT-DETR', value: 0.517 },
        { tag: 'BEATs', value: 0.655 },
        { tag: 'RT-DETR +NMS', value: 0.679, hot: true },
      ],
      note: 'RT-DETR 0.517 → 0.679 with NMS post-processing (+0.16)',
    },
  },
  {
    id: 'fg-bg-sed',
    title: 'Foreground & Background Sound Event Detection',
    kicker: 'Research Project · Fraunhofer IDMT',
    datasets: ['Foreground', 'Background'],
    narrative: [
      'Built an end-to-end pipeline for joint 26-class tagging and foreground/background prediction on USM-SED.',
      'Compared CNNs against Audio Spectrogram Transformers, optimizing the data pipeline over the architecture.',
      'Pushed mAP up with GAP+GMP pooling, SpecAugment, and grid distortion — then validated with 6-fold cross-validation.',
    ],
    tech: ['Python', 'PyTorch', 'AST', 'VGG', 'SpecAugment'],
    callout: null,
    // Scene 4's signature beat: scrub this count-up from -> to (Phase 2).
    metric: { label: 'mean average precision', from: 0.37, to: 0.41 },
  },
]

export const labNotebook = [
  {
    id: 'neural-audio-codecs',
    title: 'Neural Audio Codecs',
    subtitle: 'Audio Compression',
    dates: 'Oct 2025 – Apr 2026',
    org: 'Technische Universität Ilmenau',
    body: 'How much can you compress sound before it stops sounding human? I benchmarked modern neural audio codecs — EnCodec, Stable Codec, and Efficient Speech Coding — across compression ratio, reconstruction quality, and latency, mapping the real trade-offs for low-latency speech and audio systems.',
    tech: ['EnCodec', 'Transformers', 'Stable Codec'],
  },
  {
    id: 'blind-source-separation',
    title: 'Blind Source Separation',
    subtitle: null,
    dates: 'Apr 2025 – Oct 2025',
    org: 'Technische Universität Ilmenau',
    body: 'Given a mixed recording, can you isolate one voice in the chaos? I compared classical Independent Component Analysis against modern SepFormer-based deep learning models, evaluating separation quality with SI-SDR and SDR, and mapping where added model complexity stops paying for itself.',
    tech: ['PyTorch', 'ICA', 'SepFormer', 'FastMNMF', 'Trinicon'],
  },
  {
    id: 'speech-enhancement-unet',
    title: 'Speech Enhancement via Audio Denoising',
    subtitle: 'U-Net',
    dates: 'Oct 2024 – Apr 2025',
    org: 'Technische Universität Ilmenau',
    body: 'I built a spectrogram-based U-Net that strips noise out of speech — a hybrid DSP + ML pipeline (STFT in, ISTFT out) designed from day one for low-latency inference, then optimized to run on edge devices via TFLite.',
    tech: ['TensorFlow', 'Python', 'U-Net', 'TFLite', 'Speech Enhancement'],
  },
]
