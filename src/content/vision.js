// Computer Vision page — Camera / LiDAR 3D Tracking.
// Sourced from the project README (github.com/ms0525/camera-lidar-3d-tracking)
// and Maaz's CV. Faithful to the README's caveats: this is NOT a learned 3D
// detector, all tracking numbers use pretrained COCO checkpoints, and results
// are local TrackEval development measurements — not official KITTI test scores.

export const visionIntro = {
  eyebrow: 'Computer Vision · Multimodal Perception',
  title: 'Seeing in 3D',
  tagline: 'Fusing camera and LiDAR to place the world in three dimensions.',
  supporting:
    'The audio work is about hearing a scene. This is about seeing one — detecting, tracking, and localizing objects by fusing 2D vision with 3D LiDAR geometry on the KITTI autonomous-driving benchmark.',
}

export const cameraLidar = {
  kicker: 'KITTI · Autonomous-Driving Perception Prototype',
  title: 'Camera / LiDAR 3D Tracking',
  repo: 'https://github.com/ms0525/camera-lidar-3d-tracking',
  demo: 'https://camera-lidar-model-lab.streamlit.app/',
  summary:
    'A multimodal perception prototype that compares YOLO11s and YOLO26s camera detections, assigns class-aware Deep SORT track IDs, and associates calibrated LiDAR returns with each 2D box to estimate an approximate 3D location.',

  does: [
    'Loads synchronized KITTI camera, calibration, label, and Velodyne data.',
    'Runs YOLO11s / YOLO26s 2D detection, then tracks over time with exact-class Deep SORT association.',
    'Projects LiDAR points into the camera with the full KITTI transform, then depth-clusters inside each 2D box for a LiDAR-supported center.',
    'Exports KITTI Tracking predictions and evaluates HOTA, MOTA, IDF1, and IDSW with TrackEval.',
  ],

  // Two-branch fusion flow (camera detection + LiDAR geometry → 3D).
  pipeline: [
    { id: 'cam', stage: 'Camera frame', detail: 'KITTI image_02', lane: 'vision' },
    { id: 'yolo', stage: 'YOLO 2D boxes', detail: 'YOLO11s / YOLO26s', lane: 'vision' },
    { id: 'track', stage: 'Deep SORT IDs', detail: 'exact-class association', lane: 'vision' },
    { id: 'lidar', stage: 'LiDAR scan', detail: 'Velodyne + calibration', lane: 'geometry' },
    { id: 'proj', stage: 'Point projection', detail: 'depth clustering per box', lane: 'geometry' },
    { id: 'fuse', stage: 'Approx. 3D boxes', detail: 'LiDAR-supported centers', lane: 'fused' },
  ],
  projection: 'pixel  ∼  P2 · R0_rect · Tr_velo_to_cam · point_velodyne',

  // Headline gains — detector swap only, identical tracker settings (from the CV).
  highlights: [
    { label: 'MOTA · Car', from: 28.37, to: 33.95, unit: '%' },
    { label: 'IDF1 · Car', from: 54.46, to: 58.8, unit: '%' },
    { label: 'False positives', from: 74, to: 60, unit: '', lowerBetter: true },
    { label: 'ID switches', from: 13, to: 7, unit: '', lowerBetter: true },
  ],

  results: {
    control: {
      caption: 'Initial pretrained control — sequence 0000, Car, conf 0.28, imgsz 640',
      note: 'A controlled model comparison, not a general detector ranking (predates the exact-class fix).',
      columns: ['Model', 'HOTA %', 'MOTA %', 'IDF1 %', 'Runtime s'],
      rows: [
        ['YOLO11s', '47.81', '28.37', '54.46', '44.49'],
        ['YOLO26s · end-to-end', '48.10', '33.95', '58.80', '41.36'],
        ['YOLO26s · one-to-many', '48.72', '29.30', '58.53', '44.94'],
      ],
    },
    split: {
      caption: 'Corrected fixed-split — YOLO26s end-to-end, exact-class association, frozen conf 0.28',
      note: 'Local TrackEval measurements on disjoint splits — Tune: 12 seq / 5,027 frames · Validation: 9 seq / 2,981 frames.',
      columns: ['Split', 'Class', 'HOTA %', 'MOTA %', 'IDF1 %', 'IDSW'],
      rows: [
        ['Tune', 'Car', '49.54', '56.79', '62.41', '285'],
        ['Tune', 'Pedestrian', '38.51', '41.03', '55.51', '106'],
        ['Validation', 'Car', '55.71', '63.48', '69.79', '123'],
        ['Validation', 'Pedestrian', '43.13', '40.83', '59.92', '41'],
      ],
    },
  },

  // Engineering, straight from the CV / README.
  engineering: [
    'LiDAR-to-camera projection implemented from raw KITTI calibration and rectification matrices — not prebuilt libraries.',
    'Shipped a TrackEval harness with 129 tests on GitHub Actions CI, plus a Streamlit model-comparison dashboard.',
    'Detector swap alone (YOLO11s → YOLO26s) ran 7% faster at identical tracker settings.',
  ],

  // Honest scope — the README is emphatic about this, so the portfolio is too.
  caveats: [
    'Not a learned 3D detector — box dimensions are class priors and yaw is fixed at zero.',
    'All tracking results use pretrained COCO checkpoints; full KITTI fine-tuning remains future work.',
    'Local TrackEval development measurements, not official KITTI test-server scores.',
  ],

  tech: ['YOLO11s', 'YOLO26s', 'Deep SORT', 'KITTI', 'LiDAR', 'TrackEval', 'Open3D', 'Streamlit', 'PyTorch / ROCm'],
}

// Broader CV toolkit (from the CV's Computer Vision skills), for a quick strip.
export const visionSkills = [
  'Object detection',
  'Multi-object tracking',
  'Camera–LiDAR fusion',
  'Image segmentation',
  'OpenCV',
  'Image processing',
]

// Secondary CV work (from the CV). Lighter than the Camera/LiDAR deep-dive.
export const moreVision = [
  {
    id: 'unet-denoising',
    kicker: 'TU Ilmenau · Oct 2024 – Feb 2025',
    title: 'Cross-Domain U-Net Denoising',
    summary:
      'One convolutional architecture, two denoising problems — Gaussian image denoising and speech enhancement — solved by the same U-Net.',
    points: [
      'Trained U-Net encoder–decoders for two tasks: Gaussian image denoising and speech enhancement.',
      'Fed images directly and converted audio to fixed-size STFT spectrograms, so one architecture served both domains.',
      'Built paired training data from LibriSpeech mixed with ESC-50 noise at varied SNRs, plus calibrated synthetic image noise.',
      'Used residual skip connections to preserve fine detail and stabilise gradients through the decoder.',
    ],
    tech: ['U-Net', 'CNN', 'STFT', 'Image Denoising', 'Residual Connections'],
  },
]
