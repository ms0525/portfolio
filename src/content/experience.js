// Experience timeline — chronological (oldest first), per Scene 2 in
// 05-scene-storyboard.md. Sourced from Maaz's CV. Three roles at Fraunhofer IDMT:
// Research Project Student (Jun–Dec 2025) → Working Student (Jan–Jun 2026) →
// M.Sc. Thesis (Jul 2026 – Present, "Few-Shot Class-Incremental Learning for SED").

export const experience = [
  {
    id: 'research-project',
    role: 'Research Project Student',
    org: 'Fraunhofer IDMT',
    dates: 'Jun 2025 – Dec 2025',
    project: 'Foreground & Background Sound Event Detection in Complex Acoustic Scenes',
    body: [
      'Built an end-to-end pipeline for joint 26-class sound-event tagging and foreground/background prediction on USM-SED.',
      'Lifted single-task tagging mAP from 0.276 to 0.384 with GAP+GMP pooling and SpecAugment / grid-distortion augmentation.',
      'Added a dual-head multi-task setup — tagging mAP 0.398 → 0.410, foreground/background 0.351 → 0.371 on an identical split.',
      'Validated with 6-fold cross-validation (0.416 ± 0.005 mAP), beating the published USM-SED baseline of 0.37.',
    ],
    tech: ['Python', 'PyTorch', 'AST', 'VGG', 'Transformers', 'SpecAugment'],
    status: 'completed',
  },
  {
    id: 'working-student',
    role: 'Working Student, Deep Learning / Audio ML',
    org: 'Fraunhofer IDMT',
    dates: 'Jan 2026 – Jun 2026',
    project: 'Sound Event Detection via Vision Models',
    body: [
      'Reframed sound event detection as object detection — audio becomes a spectrogram, then models localize events in time and frequency.',
      'Fine-tuned YOLOv11 and RT-DETR on log-Mel spectrograms, benchmarked against BEATs and ATST audio-transformer baselines.',
      'Designed model-agnostic post-processing (NMS tuning, aspect-ratio filtering, box merging) that lifted event F1 from 0.517 to 0.679.',
      'Built annotated datasets from three source corpora and ran multi-GPU ablations; first-authored the BioDCASE 2026 technical report.',
    ],
    tech: ['Python', 'PyTorch', 'YOLO', 'ATST', 'BEATs'],
    status: 'completed',
  },
  {
    id: 'msc-thesis',
    role: 'M.Sc. Thesis',
    org: 'Fraunhofer IDMT',
    dates: 'Jul 2026 – Present',
    project: 'Few-Shot Class-Incremental Learning for Sound Event Detection',
    body: [
      'Adapting few-shot class-incremental learning from computer vision to sound event detection — an underexplored setting.',
      'Designing base/novel class splits with one- to five-shot incremental sessions on DESED and ESC-Soundscapes.',
      'Adding metrics for catastrophic forgetting, accuracy retention, and base/novel-class interference across sessions.',
    ],
    tech: ['Python', 'PyTorch', 'Few-Shot Learning', 'Class-Incremental Learning'],
    status: 'active',
  },
]
