// Skills — labeled clusters for the spectrum-analyzer visualization (Scene 6).
// Per Maaz's guidance, bar heights now reflect proficiency: `level` (0–100)
// drives each bar. Python/PyTorch are primary; among models CNNs & Transformers
// are strongest, then Hybrid, then RNNs; C++ is basic. Skills without an explicit
// ranking sit high and near-uniform (tools he uses, not a fine-grained ladder).

export const skillClusters = [
  {
    id: 'machine-learning',
    label: 'Machine Learning',
    skills: [
      { name: 'PyTorch', level: 96 },
      { name: 'Transformers', level: 96 },
      { name: 'CNNs', level: 96 },
      { name: 'Scikit-Learn', level: 84 },
      { name: 'Hybrid Architectures', level: 70 },
      { name: 'RNNs', level: 58 },
    ],
  },
  {
    id: 'languages',
    label: 'Languages',
    skills: [
      { name: 'Python', level: 96 },
      { name: 'C++ (Basic)', level: 46 },
    ],
  },
  {
    id: 'audio-processing',
    label: 'Audio Processing',
    skills: [
      { name: 'Librosa', level: 90 },
      { name: 'NumPy', level: 88 },
      { name: 'SciPy', level: 84 },
      { name: 'Matplotlib', level: 82 },
    ],
  },
  {
    id: 'computer-vision',
    label: 'Computer Vision',
    skills: [
      { name: 'OpenCV', level: 88 },
      { name: 'Object detection', level: 90 },
      { name: 'Image segmentation', level: 84 },
      { name: 'Image processing', level: 84 },
      { name: 'Open3D', level: 82 },
      { name: 'Deep SORT', level: 84 },
    ],
  },
  {
    id: 'other',
    label: 'Other',
    skills: [
      { name: 'Git', level: 90 },
      { name: 'Docker', level: 86 },
      { name: 'Streamlit', level: 86 },
      { name: 'ONNX', level: 82 },
      { name: 'React', level: 82 },
      { name: 'Django', level: 82 },
      { name: 'Flask', level: 82 },
    ],
  },
]
