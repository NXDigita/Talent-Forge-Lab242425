export interface Challenge {
  id: string;
  title: string;
  desc: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Expert";
  points: number;
  attempts: number;
  deadlineHours: number;
  brief: string;
}

export const challenges: Challenge[] = [
  { id: "ch_1", title: "Design a Class-AB Output Stage", desc: "Crossover-distortion-free 200mW headphone driver.", category: "analog", difficulty: "Hard", points: 450, attempts: 1284, deadlineHours: 72, brief: "Design a Class-AB push-pull output stage capable of driving a 32Ω headphone load with no audible crossover distortion. Constraints:\n• THD < 0.05% @ 1kHz, 100mW\n• Quiescent current < 8mA\n• Supply: ±5V" },
  { id: "ch_2", title: "8-bit Pipelined ADC", desc: "Build the comparator chain.", category: "digital", difficulty: "Expert", points: 800, attempts: 412, deadlineHours: 24, brief: "Implement an 8-bit pipelined ADC at 100MS/s sampling. Each stage resolves 1.5 bits with redundancy." },
  { id: "ch_3", title: "Boost Converter, 3.3V → 12V", desc: "1A load, 90% efficiency.", category: "power", difficulty: "Medium", points: 320, attempts: 2104, deadlineHours: 168, brief: "Design a synchronous boost converter from 3.3V to 12V at 1A load, ≥90% peak efficiency, < 50mV ripple." },
  { id: "ch_4", title: "LNA @ 2.4 GHz", desc: "WiFi front-end with NF < 1.5dB.", category: "rf", difficulty: "Hard", points: 520, attempts: 687, deadlineHours: 48, brief: "Design a single-stage LNA centered at 2.4GHz. NF < 1.5dB, gain > 15dB, IIP3 > -10dBm." },
  { id: "ch_5", title: "Bare-metal UART driver", desc: "115200 baud on STM32F0.", category: "embedded", difficulty: "Easy", points: 180, attempts: 4218, deadlineHours: 240, brief: "Implement a polled UART transmit/receive driver. No HAL allowed." },
  { id: "ch_6", title: "PID for Inverted Pendulum", desc: "Stabilize within 2 seconds.", category: "control", difficulty: "Hard", points: 480, attempts: 921, deadlineHours: 96, brief: "Tune a PID controller to balance an inverted pendulum on a cart. Settling time ≤ 2s, overshoot ≤ 15%." },
  { id: "ch_7", title: "Bandgap Reference", desc: "1.2V ±0.5% over -40 to 125°C.", category: "analog", difficulty: "Expert", points: 720, attempts: 308, deadlineHours: 120, brief: "CMOS bandgap reference. Output 1.2V ± 6mV across full automotive temperature range." },
  { id: "ch_8", title: "FIFO with Gray-coded pointers", desc: "Async clock domain crossing.", category: "digital", difficulty: "Medium", points: 300, attempts: 1567, deadlineHours: 144, brief: "Build a parameterizable async FIFO using gray-coded read/write pointers." },
  { id: "ch_9", title: "Mixer with image rejection", desc: "70dB image rejection ratio.", category: "rf", difficulty: "Hard", points: 580, attempts: 421, deadlineHours: 60, brief: "Design a Hartley/Weaver image-reject mixer at 900MHz." },
  { id: "ch_10", title: "Kalman filter for IMU", desc: "Sensor fusion in fixed-point.", category: "control", difficulty: "Medium", points: 380, attempts: 1098, deadlineHours: 96, brief: "Implement a 6-state Kalman filter fusing accelerometer + gyroscope readings." },
];
