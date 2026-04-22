
export interface ElementData {
  number: number;
  symbol: string;
  name: string;
  mass: number;
  category: string;
  electrons: number[];
  summary: string;
  discovery: string;
  color: string;
  config?: string;
  radius: number;
  ionization: number;
  electronegativity: number;
  period: number;
  group: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export enum SubjectId {
  CHEMISTRY = 'chemistry',
  PHYSICS = 'physics',
  MATH = 'math',
  BIOLOGY = 'biology',
}

export enum TopicId {
  ATOMIC_STRUCTURE = 'atomic_structure',
  MOLECULAR_STRUCTURE = 'molecular_structure',
  QUANTUM_NUMBERS = 'quantum_numbers',
  PERIODIC_TRENDS = 'periodic_trends',
  HISTORICAL_MODELS = 'historical_models',
  QUANTUM_CONFIG = 'quantum_config',
  // Placeholders for other subjects
  MECHANICS = 'mechanics',
  ELECTROMAGNETISM='Electromagnetism',
  CALCULUS = 'calculus',
  GENETICS = 'genetics',
  TRIGONOMETRY = "TRIGONOMETRY",
  ALGEBRA = "ALGEBRA",
}

export interface Topic {
  id: TopicId;
  name: string;
  description: string;
  theory: string;
}

export interface Subject {
  id: SubjectId;
  name: string;
  icon: string;
  color: string;
  topics: Topic[];
}

export enum ViewState {
  LANDING = 'landing',
  SUBJECT = 'subject',
  TOPIC = 'topic',
}

export enum TopicView {
  THEORY = 'theory',
  VISUALIZATION = 'visualization',
  CLASSROOM = 'classroom',
}

export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

export interface Molecule {
  formula: string;
  name: string;
  centralAtom: string;
  atoms: { symbol: string; pos: Vector3 }[];
  lonePairs: Vector3[];
  realAngle: string;
  modelAngle: string;
}

export interface Resource {
  id: string;
  topicId: string;
  name: string;
  type: string;
  content: string; // base64 or text
  timestamp: number;
}

export interface DiscussionPost {
  id: string;
  topicId: string;
  author: string;
  content: string;
  timestamp: number;
  type: 'announcement' | 'problem';
}

export interface DiscussionComment {
  id: string;
  postId: string;
  author: string;
  content: string;
  timestamp: number;
}

export type UserRole = 'student' | 'teacher' | 'institute';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  subject: SubjectId;
}
