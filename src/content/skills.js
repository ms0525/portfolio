// Skills — five labeled clusters for the spectrum-analyzer visualization
// (Scene 6). Per 02/05, render as grouped clusters, NOT a flat tag cloud, and
// do NOT imply a proficiency ranking — bar heights stay near-uniform.

export const skillClusters = [
  {
    id: 'programming-ml',
    label: 'Programming & ML',
    skills: ['Python', 'C++', 'PyTorch', 'TensorFlow'],
  },
  {
    id: 'models',
    label: 'ML & DL Models',
    skills: ['Transformers', 'CNNs', 'RNNs', 'Hybrid architectures'],
  },
  {
    id: 'audio-dsp',
    label: 'Audio & DSP',
    skills: ['Librosa', 'Mel Spectrograms', 'MFCC', 'LEAF', 'PCEN', 'STFT/ISTFT'],
  },
  {
    id: 'tools',
    label: 'Tools',
    skills: ['ONNX', 'LiteRT (TFLite)', 'OpenCV'],
  },
  {
    id: 'core-areas',
    label: 'Core Areas',
    skills: [
      'Hyperparameter Optimisation',
      'Experiment Design',
      'Model Benchmarking',
      'Data Augmentation',
    ],
  },
]
