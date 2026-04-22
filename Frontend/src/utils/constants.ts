
import { ElementData, Molecule, Subject, SubjectId, TopicId } from '../types/types';

export const SUBJECTS: Subject[] = [
  {
    id: SubjectId.CHEMISTRY,
    name: 'Chemistry',
    icon: 'Beaker',
    color: 'emerald',
    topics: [
      {
        id: TopicId.ATOMIC_STRUCTURE,
        name: 'Atomic Structure',
        description: 'Explore the building blocks of matter, from subatomic particles to electron orbitals.',
        theory: `
# Atomic Structure
The atom is the basic unit of matter. It consists of a central **nucleus** surrounded by a cloud of **electrons**.

## Subatomic Particles
1. **Protons**: Positively charged particles in the nucleus. The number of protons defines the element (Atomic Number).
2. **Neutrons**: Neutral particles in the nucleus. They provide stability to the nucleus.
3. **Electrons**: Negatively charged particles that orbit the nucleus in specific energy levels.

## Orbitals and Energy Levels
Electrons don't move in simple circles. They exist in **orbitals**, which are regions of space where there is a high probability of finding an electron.
- **s-orbitals**: Spherical shape.
- **p-orbitals**: Dumbbell shape.
- **d and f orbitals**: More complex shapes.
        `
      },
      {
        id: TopicId.MOLECULAR_STRUCTURE,
        name: 'Molecular Structure',
        description: 'Understand how atoms bond together to form molecules and their 3D shapes.',
        theory: `
# Molecular Structure
Molecules are formed when two or more atoms bond together. The shape of a molecule is determined by the arrangement of its atoms in space.

## VSEPR Theory
Valence Shell Electron Pair Repulsion (VSEPR) theory predicts the geometry of molecules based on the idea that electron pairs around a central atom stay as far apart as possible to minimize repulsion.

## Common Geometries
- **Linear**: 180° angle (e.g., CO₂)
- **Bent**: < 120° or 109.5° (e.g., H₂O)
- **Trigonal Planar**: 120° (e.g., BF₃)
- **Tetrahedral**: 109.5° (e.g., CH₄)
        `
      },
      {
        id: TopicId.QUANTUM_NUMBERS,
        name: 'Quantum Numbers',
        description: 'Learn the four quantum numbers that describe the unique state of an electron.',
        theory: `
# Quantum Numbers
Quantum numbers are like the "address" of an electron in an atom. No two electrons in the same atom can have the same set of four quantum numbers.

1. **Principal Quantum Number (n)**: Describes the energy level (1, 2, 3...).
2. **Angular Momentum (l)**: Describes the shape of the orbital (0 to n-1).
3. **Magnetic (ml)**: Describes the orientation of the orbital (-l to +l).
4. **Spin (ms)**: Describes the direction of electron spin (+1/2 or -1/2).
        `
      },
      {
        id: TopicId.PERIODIC_TRENDS,
        name: 'Periodic Trends',
        description: 'Discover how properties like atomic radius and electronegativity change across the periodic table.',
        theory: `
# Periodic Trends
The periodic table is organized such that elements with similar properties fall into the same columns (groups).

## Key Trends
- **Atomic Radius**: Decreases across a period (left to right) and increases down a group.
- **Electronegativity**: Increases across a period and decreases down a group.
- **Ionization Energy**: Increases across a period and decreases down a group.
        `
      },
      {
        id: TopicId.HISTORICAL_MODELS,
        name: 'Historical Models',
        description: 'Trace the evolution of atomic theory from Dalton to the modern Quantum Mechanical model.',
        theory: `
# Historical Atomic Models
Our understanding of the atom has changed significantly over time.

1. **Dalton's Model**: Solid sphere.
2. **Thomson's Plum Pudding**: Electrons in a positive "soup".
3. **Rutherford's Model**: Small, dense nucleus with orbiting electrons.
4. **Bohr's Model**: Electrons in fixed circular orbits.
5. **Quantum Mechanical Model**: Electrons in probability "clouds" (orbitals).
        `
      },
      {
        id: TopicId.QUANTUM_CONFIG,
        name: 'Quantum Configuration',
        description: 'Master the rules for filling electron shells and writing electron configurations.',
        theory: `
# Electron Configuration
Electron configuration is the distribution of electrons of an atom or molecule in atomic or molecular orbitals.

## Key Principles
- **Aufbau Principle**: Electrons fill lower-energy orbitals first.
- **Pauli Exclusion Principle**: An orbital can hold a maximum of two electrons with opposite spins.
- **Hund's Rule**: Electrons fill degenerate orbitals singly before pairing up.
        `
      }
    ]
  },

{
    id: SubjectId.PHYSICS,
    name: 'Physics',
    icon: 'Zap',
    color: 'blue',
    topics: [
      {
        id: TopicId.MECHANICS,
        name: 'Classical Mechanics',
        description: 'Study motion, forces, and energy in the macroscopic world.',
        theory: `
# Classical Mechanics
Classical mechanics mathematically describes the motion of macroscopic objects, from projectiles to planets. The entire interactive visualization engine is driven by these fundamental equations.

## Kinematics (Equations of Motion)
Valid for constant acceleration in a straight line.
- **Velocity-Time**: v = u + at
- **Displacement-Time**: s = ut + ½at²
- **Velocity-Displacement**: v² = u² + 2as

## Newton's Laws of Motion
- **First Law (Inertia)**: An object at rest stays at rest, and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force.
- **Second Law (Force)**: The rate of change of momentum of a body is directly proportional to the applied force. (F = ma)
- **Third Law (Action/Reaction)**: For every action, there is an equal and opposite reaction.

## Conservation Principles
- **Kinetic Energy**: The energy an object possesses due to its motion. (Ek = ½mv²)
- **Momentum**: The quantity of motion of a moving body. (p = mv)
      
`
      },
      {
        id: TopicId.ELECTROMAGNETISM,
        name: 'Electromagnetism',
        description: 'Explore electric fields, magnetic forces, and the fundamental laws of circuits.',
        theory: `
# Electromagnetism
Electromagnetism deals with the electromagnetic force that occurs between electrically charged particles. It is one of the four fundamental forces of nature and governs everything from simple circuits to light waves.

## Electrostatics & Electric Fields
- **Coulomb's Law**: Calculates the electric force between two point charges. (F = k|q₁q₂| / r²)
- **Electric Field (E)**: The force per unit charge experienced by a positive test charge placed in the field. (E = F / q)
- **Electric Potential**: The potential energy per unit charge, often called voltage.

## Current & Circuits
- **Ohm's Law**: The current through a conductor between two points is directly proportional to the voltage across the two points. (V = IR)
- **Electrical Power**: The rate at which electrical energy is transferred by an electric circuit. (P = VI = I²R)
- **Kirchhoff's Laws**: Rules governing the conservation of charge and energy in complex electrical circuits.

## Magnetism & Induction
- **Magnetic Field (B)**: A vector field that describes the magnetic influence on moving electric charges and magnetic materials.
- **Lorentz Force**: The total force exerted on a charged particle moving through both an electric and magnetic field. (F = qE + qv × B)
- **Faraday's Law**: A changing magnetic environment will induce an electromotive force (EMF) in a wire loop.
        `
      }
    ]
  },
{
  id: SubjectId.MATH,
  name: 'Mathematics',
  icon: 'Calculator',
  color: 'amber',
  topics: [
    {
      id: TopicId.ALGEBRA,
      name: 'Algebra',
      description: 'Learn equations, variables, and problem solving.',
      theory: `
# Algebra

Algebra is the branch of mathematics that uses symbols and variables to represent numbers and relationships.

## Key Concepts

• Variables: Symbols like x, y represent unknown values  
• Constants: Fixed values like 2, 5, 10  
• Expressions: Combination of variables and numbers  

## Linear Equation
$$ax + b = 0$$

Solution:
$$x = -\\frac{b}{a}$$

## Example
Solve:
$$2x + 4 = 0$$

$$2x = -4$$  
$$x = -2$$

## Quadratic Equation
$$ax^2 + bx + c = 0$$

Solution:
$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$

## Why Algebra Matters
• Used in programming  
• Helps in problem solving  
• Foundation for higher mathematics  
`
    },

    {
      id: TopicId.CALCULUS,
      name: 'Calculus',
      description: 'Understand change through derivatives and integrals.',
      theory: `
# Calculus

Calculus studies how things change and accumulate.

## 1. Limits
Limits describe behavior of functions as input approaches a value.

$$\\lim_{x \\to a} f(x)$$

## 2. Derivatives (Rate of Change)

Derivative measures how fast something changes.

$$\\frac{d}{dx}(x^n) = nx^{n-1}$$

### Example
$$\\frac{d}{dx}(x^2) = 2x$$

Used in:
• Speed & motion  
• Optimization problems  

## 3. Integrals (Area Under Curve)

$$\\int x^n dx = \\frac{x^{n+1}}{n+1} + C$$

### Example
$$\\int x^2 dx = \\frac{x^3}{3} + C$$

Used in:
• Finding area  
• Physics (work, energy)

## Real Life Applications
• Engineering  
• AI & Machine Learning  
• Economics
`
    },

    {
      id: TopicId.TRIGONOMETRY,
      name: 'Trigonometry',
      description: 'Study angles and relationships in triangles.',
      theory: `
# Trigonometry

Trigonometry studies relationships between angles and sides of triangles.

## Basic Ratios

$$\\sin \\theta = \\frac{opposite}{hypotenuse}$$  
$$\\cos \\theta = \\frac{adjacent}{hypotenuse}$$  
$$\\tan \\theta = \\frac{opposite}{adjacent}$$  

## Important Identity

$$\\sin^2\\theta + \\cos^2\\theta = 1$$

## Example

If:
$$\\sin \\theta = \\frac{3}{5}$$

Then:
$$\\cos \\theta = \\frac{4}{5}$$

## Applications
• Navigation (GPS)  
• Waves & sound  
• Computer graphics  

## Graph Insight

Sine wave:
$$y = \\sin x$$

It is periodic and repeats every:
$$2\\pi$$
`
    }
  ]
},
  {
    id: SubjectId.BIOLOGY,
    name: 'Biology',
    icon: 'Beaker', 
    color: 'emerald',
    topics: [
      {
        id: TopicId.MICROBIOLOGY,
        name: 'Microorganisms',
        description: 'Analyze the 3D structure and movement mechanisms of a single-celled bacterium.',
        theory: `
# Microorganisms: The Bacterium
Bacteria are prokaryotic microorganisms. They are incredibly resilient and exist in almost every environment on Earth.

## Structural Anatomy
Unlike complex cells, bacteria lack a membrane-bound nucleus.
- **Capsule & Cell Wall**: The rigid outer layers that provide structural support and protection from the environment.
- **Nucleoid**: An irregularly shaped region within the cell where the genetic material (circular DNA) is localized.
- **Flagella**: Long, whip-like appendages driven by a biological motor used for cellular locomotion.
- **Pili**: Hair-like structures on the surface used for attachment to surfaces and DNA transfer.
        `
      },
      {
        id: TopicId.CELL_BIOLOGY,
        name: 'Cellular Anatomy',
        description: 'Explore a 3D cross-section of a eukaryotic cell and its organelles.',
        theory: `
# Cellular Anatomy
Eukaryotic cells are the complex building blocks of animals and plants. They are defined by having a true, membrane-bound nucleus and specialized organelles.

## Key Organelles
- **Nucleus**: The control center. It houses the cell's linear DNA and coordinates cell activities like growth and reproduction.
- **Mitochondria**: The site of cellular respiration, generating the cell's supply of adenosine triphosphate (ATP) used as a source of chemical energy.
- **Cytoplasm**: The jelly-like substance filling the cell, providing a medium for chemical reactions and suspending the organelles.
- **Cell Membrane**: The selectively permeable barrier that controls the movement of substances in and out of the cell.
        `
      }
    ]
  }
];

// Full 1-118 Periodic Table Dataset
export const ELEMENTS: ElementData[] = [
  { number: 1, symbol: 'H', name: 'Hydrogen', mass: 1.008, category: 'Nonmetal', electrons: [1], discovery: '1766', color: '#3b82f6', config: '1s¹', radius: 37, ionization: 1312, electronegativity: 2.20, period: 1, group: 1, summary: 'The lightest element and most abundant chemical substance in the universe.' },
  { number: 2, symbol: 'He', name: 'Helium', mass: 4.0026, category: 'Noble Gas', electrons: [2], discovery: '1868', color: '#f59e0b', config: '1s²', radius: 31, ionization: 2372, electronegativity: 0, period: 1, group: 18, summary: 'A colorless, odorless, tasteless, non-toxic, inert, monatomic gas.' },
  { number: 3, symbol: 'Li', name: 'Lithium', mass: 6.94, category: 'Alkali Metal', electrons: [2, 1], discovery: '1817', color: '#ef4444', config: '[He] 2s¹', radius: 152, ionization: 520, electronegativity: 0.98, period: 2, group: 1, summary: 'A soft, silvery-white alkali metal.' },
  { number: 4, symbol: 'Be', name: 'Beryllium', mass: 9.0122, category: 'Alkaline Earth Metal', electrons: [2, 2], discovery: '1798', color: '#10b981', config: '[He] 2s²', radius: 112, ionization: 900, electronegativity: 1.57, period: 2, group: 2, summary: 'A steel-gray, strong, lightweight and brittle alkaline earth metal.' },
  { number: 5, symbol: 'B', name: 'Boron', mass: 10.81, category: 'Metalloid', electrons: [2, 3], discovery: '1808', color: '#8b5cf6', config: '[He] 2s² 2p¹', radius: 88, ionization: 801, electronegativity: 2.04, period: 2, group: 13, summary: 'A metalloid element, found entirely in combination in various minerals.' },
  { number: 6, symbol: 'C', name: 'Carbon', mass: 12.011, category: 'Nonmetal', electrons: [2, 4], discovery: 'Ancient', color: '#4b5563', config: '[He] 2s² 2p²', radius: 77, ionization: 1086, electronegativity: 2.55, period: 2, group: 14, summary: 'Nonmetallic and tetravalent—making four electrons available to form covalent chemical bonds.' },
  { number: 7, symbol: 'N', name: 'Nitrogen', mass: 14.007, category: 'Nonmetal', electrons: [2, 5], discovery: '1772', color: '#3b82f6', config: '[He] 2s² 2p³', radius: 70, ionization: 1402, electronegativity: 3.04, period: 2, group: 15, summary: 'A chemical element that at standard temperature and pressure is a colorless gas.' },
  { number: 8, symbol: 'O', name: 'Oxygen', mass: 15.999, category: 'Nonmetal', electrons: [2, 6], discovery: '1774', color: '#ef4444', config: '[He] 2s² 2p⁴', radius: 66, ionization: 1314, electronegativity: 3.44, period: 2, group: 16, summary: 'The third-most abundant element in the universe, after hydrogen and helium.' },
  { number: 9, symbol: 'F', name: 'Fluorine', mass: 18.998, category: 'Halogen', electrons: [2, 7], discovery: '1886', color: '#10b981', config: '[He] 2s² 2p⁵', radius: 64, ionization: 1681, electronegativity: 3.98, period: 2, group: 17, summary: 'The most electronegative element and is extremely reactive.' },
  { number: 10, symbol: 'Ne', name: 'Neon', mass: 20.180, category: 'Noble Gas', electrons: [2, 8], discovery: '1898', color: '#f59e0b', config: '[He] 2s² 2p⁶', radius: 58, ionization: 2081, electronegativity: 0, period: 2, group: 18, summary: 'A noble gas. Neon is chemically inert.' },
  { number: 11, symbol: 'Na', name: 'Sodium', mass: 22.990, category: 'Alkali Metal', electrons: [2, 8, 1], discovery: '1807', color: '#ef4444', config: '[Ne] 3s¹', radius: 186, ionization: 496, electronegativity: 0.93, period: 3, group: 1, summary: 'A soft, silvery-white, highly reactive metal.' },
  { number: 12, symbol: 'Mg', name: 'Magnesium', mass: 24.305, category: 'Alkaline Earth Metal', electrons: [2, 8, 2], discovery: '1755', color: '#10b981', config: '[Ne] 3s²', radius: 160, ionization: 738, electronegativity: 1.31, period: 3, group: 2, summary: 'A shiny gray solid.' },
  { number: 13, symbol: 'Al', name: 'Aluminium', mass: 26.982, category: 'Post-transition Metal', electrons: [2, 8, 3], discovery: '1825', color: '#6366f1', config: '[Ne] 3s² 3p¹', radius: 143, ionization: 578, electronegativity: 1.61, period: 3, group: 13, summary: 'A silvery-white, soft metal.' },
  { number: 14, symbol: 'Si', name: 'Silicon', mass: 28.085, category: 'Metalloid', electrons: [2, 8, 4], discovery: '1823', color: '#8b5cf6', config: '[Ne] 3s² 3p²', radius: 111, ionization: 786, electronegativity: 1.90, period: 3, group: 14, summary: 'A hard, brittle crystalline solid.' },
  { number: 15, symbol: 'P', name: 'Phosphorus', mass: 30.974, category: 'Nonmetal', electrons: [2, 8, 5], discovery: '1669', color: '#4b5563', config: '[Ne] 3s² 3p³', radius: 106, ionization: 1012, electronegativity: 2.19, period: 3, group: 15, summary: 'Highly reactive element.' },
  { number: 16, symbol: 'S', name: 'Sulfur', mass: 32.06, category: 'Nonmetal', electrons: [2, 8, 6], discovery: 'Ancient', color: '#fbbf24', config: '[Ne] 3s² 3p⁴', radius: 102, ionization: 1000, electronegativity: 2.58, period: 3, group: 16, summary: 'A bright yellow, brittle solid.' },
  { number: 17, symbol: 'Cl', name: 'Chlorine', mass: 35.45, category: 'Halogen', electrons: [2, 8, 7], discovery: '1774', color: '#10b981', config: '[Ne] 3s² 3p⁵', radius: 99, ionization: 1251, electronegativity: 3.16, period: 3, group: 17, summary: 'The second-lightest of the halogens.' },
  { number: 18, symbol: 'Ar', name: 'Argon', mass: 39.948, category: 'Noble Gas', electrons: [2, 8, 8], discovery: '1894', color: '#f59e0b', config: '[Ne] 3s² 3p⁶', radius: 97, ionization: 1521, electronegativity: 0, period: 3, group: 18, summary: 'The third-most abundant gas in Earth\'s atmosphere.' },
  { number: 19, symbol: 'K', name: 'Potassium', mass: 39.098, category: 'Alkali Metal', electrons: [2, 8, 8, 1], discovery: '1807', color: '#ef4444', config: '[Ar] 4s¹', radius: 227, ionization: 419, electronegativity: 0.82, period: 4, group: 1, summary: 'A silvery-white metal.' },
  { number: 20, symbol: 'Ca', name: 'Calcium', mass: 40.078, category: 'Alkaline Earth Metal', electrons: [2, 8, 8, 2], discovery: '1808', color: '#10b981', config: '[Ar] 4s²', radius: 197, ionization: 590, electronegativity: 1.00, period: 4, group: 2, summary: 'An alkaline earth metal.' },
  { number: 21, symbol: 'Sc', name: 'Scandium', mass: 44.956, category: 'Transition Metal', electrons: [2, 8, 9, 2], discovery: '1879', color: '#6366f1', config: '[Ar] 3d¹ 4s²', radius: 160, ionization: 633, electronegativity: 1.36, period: 4, group: 3, summary: 'A soft, silvery-white metallic element.' },
  { number: 22, symbol: 'Ti', name: 'Titanium', mass: 47.867, category: 'Transition Metal', electrons: [2, 8, 10, 2], discovery: '1791', color: '#8b5cf6', config: '[Ar] 3d² 4s²', radius: 140, ionization: 658, electronegativity: 1.54, period: 4, group: 4, summary: 'A strong, low-density, highly corrosion-resistant metal.' },
  { number: 23, symbol: 'V', name: 'Vanadium', mass: 50.941, category: 'Transition Metal', electrons: [2, 8, 11, 2], discovery: '1801', color: '#4b5563', config: '[Ar] 3d³ 4s²', radius: 135, ionization: 650, electronegativity: 1.63, period: 4, group: 5, summary: 'A hard, silvery-grey, ductile transition metal.' },
  { number: 24, symbol: 'Cr', name: 'Chromium', mass: 51.996, category: 'Transition Metal', electrons: [2, 8, 13, 1], discovery: '1797', color: '#fbbf24', config: '[Ar] 3d⁵ 4s¹', radius: 140, ionization: 653, electronegativity: 1.66, period: 4, group: 6, summary: 'A steely-grey, lustrous, hard and brittle metal.' },
  { number: 25, symbol: 'Mn', name: 'Manganese', mass: 54.938, category: 'Transition Metal', electrons: [2, 8, 13, 2], discovery: '1774', color: '#10b981', config: '[Ar] 3d⁵ 4s²', radius: 139, ionization: 717, electronegativity: 1.55, period: 4, group: 7, summary: 'A silvery-gray metal.' },
  { number: 26, symbol: 'Fe', name: 'Iron', mass: 55.845, category: 'Transition Metal', electrons: [2, 8, 14, 2], discovery: 'Ancient', color: '#f87171', config: '[Ar] 3d⁶ 4s²', radius: 138, ionization: 762, electronegativity: 1.83, period: 4, group: 8, summary: 'The most common element on Earth by mass.' },
  { number: 27, symbol: 'Co', name: 'Cobalt', mass: 58.933, category: 'Transition Metal', electrons: [2, 8, 15, 2], discovery: '1735', color: '#6366f1', config: '[Ar] 3d⁷ 4s²', radius: 135, ionization: 760, electronegativity: 1.88, period: 4, group: 9, summary: 'A hard, lustrous, silver-gray metal.' },
  { number: 28, symbol: 'Ni', name: 'Nickel', mass: 58.693, category: 'Transition Metal', electrons: [2, 8, 16, 2], discovery: '1751', color: '#8b5cf6', config: '[Ar] 3d⁸ 4s²', radius: 134, ionization: 737, electronegativity: 1.91, period: 4, group: 10, summary: 'A silvery-white lustrous metal with a slight golden tinge.' },
  { number: 29, symbol: 'Cu', name: 'Copper', mass: 63.546, category: 'Transition Metal', electrons: [2, 8, 18, 1], discovery: 'Ancient', color: '#fbbf24', config: '[Ar] 3d¹⁰ 4s¹', radius: 135, ionization: 745, electronegativity: 1.90, period: 4, group: 11, summary: 'A soft, malleable, and ductile metal with very high thermal and electrical conductivity.' },
  { number: 30, symbol: 'Zn', name: 'Zinc', mass: 65.38, category: 'Transition Metal', electrons: [2, 8, 18, 2], discovery: '1746', color: '#10b981', config: '[Ar] 3d¹⁰ 4s²', radius: 134, ionization: 906, electronegativity: 1.65, period: 4, group: 12, summary: 'A slightly brittle metal at room temperature and has a blue-silvery appearance when oxidation is removed.' },
  { number: 31, symbol: 'Ga', name: 'Gallium', mass: 69.723, category: 'Post-transition Metal', electrons: [2, 8, 18, 3], discovery: '1875', color: '#6366f1', config: '[Ar] 3d¹⁰ 4s² 4p¹', radius: 126, ionization: 579, electronegativity: 1.81, period: 4, group: 13, summary: 'A soft, silvery metal.' },
  { number: 32, symbol: 'Ge', name: 'Germanium', mass: 72.63, category: 'Metalloid', electrons: [2, 8, 18, 4], discovery: '1886', color: '#8b5cf6', config: '[Ar] 3d¹⁰ 4s² 4p²', radius: 125, ionization: 762, electronegativity: 2.01, period: 4, group: 14, summary: 'A lustrous, hard-brittle, grayish-white metalloid.' },
  { number: 33, symbol: 'As', name: 'Arsenic', mass: 74.922, category: 'Metalloid', electrons: [2, 8, 18, 5], discovery: '1250', color: '#4b5563', config: '[Ar] 3d¹⁰ 4s² 4p³', radius: 114, ionization: 947, electronegativity: 2.18, period: 4, group: 15, summary: 'A metalloid that has various allotropes.' },
  { number: 34, symbol: 'Se', name: 'Selenium', mass: 78.971, category: 'Nonmetal', electrons: [2, 8, 18, 6], discovery: '1817', color: '#fbbf24', config: '[Ar] 3d¹⁰ 4s² 4p⁴', radius: 103, ionization: 941, electronegativity: 2.55, period: 4, group: 16, summary: 'A nonmetal with properties that are intermediate between the elements above and below in the periodic table.' },
  { number: 35, symbol: 'Br', name: 'Bromine', mass: 79.904, category: 'Halogen', electrons: [2, 8, 18, 7], discovery: '1826', color: '#10b981', config: '[Ar] 3d¹⁰ 4s² 4p⁵', radius: 94, ionization: 1140, electronegativity: 2.96, period: 4, group: 17, summary: 'A fuming red-brown liquid at room temperature.' },
  { number: 36, symbol: 'Kr', name: 'Krypton', mass: 83.798, category: 'Noble Gas', electrons: [2, 8, 18, 8], discovery: '1898', color: '#f59e0b', config: '[Ar] 3d¹⁰ 4s² 4p⁶', radius: 88, ionization: 1350, electronegativity: 0, period: 4, group: 18, summary: 'A colorless, odorless, tasteless noble gas.' },
  { number: 37, symbol: 'Rb', name: 'Rubidium', mass: 85.467, category: 'Alkali Metal', electrons: [2, 8, 18, 8, 1], discovery: '1861', color: '#ef4444', config: '[Kr] 5s¹', radius: 235, ionization: 403, electronegativity: 0.82, period: 5, group: 1, summary: 'A soft, silvery-white metallic element.' },
  { number: 38, symbol: 'Sr', name: 'Strontium', mass: 87.62, category: 'Alkaline Earth Metal', electrons: [2, 8, 18, 8, 2], discovery: '1790', color: '#10b981', config: '[Kr] 5s²', radius: 200, ionization: 550, electronegativity: 0.95, period: 5, group: 2, summary: 'A soft silver-white yellowish metallic element.' },
  { number: 39, symbol: 'Y', name: 'Yttrium', mass: 88.906, category: 'Transition Metal', electrons: [2, 8, 18, 9, 2], discovery: '1794', color: '#6366f1', config: '[Kr] 4d¹ 5s²', radius: 180, ionization: 600, electronegativity: 1.22, period: 5, group: 3, summary: 'A silvery-metallic transition metal.' },
  { number: 40, symbol: 'Zr', name: 'Zirconium', mass: 91.224, category: 'Transition Metal', electrons: [2, 8, 18, 10, 2], discovery: '1789', color: '#8b5cf6', config: '[Kr] 4d² 5s²', radius: 160, ionization: 640, electronegativity: 1.33, period: 5, group: 4, summary: 'A lustrous, grey-white, strong transition metal.' },
  { number: 41, symbol: 'Nb', name: 'Niobium', mass: 92.906, category: 'Transition Metal', electrons: [2, 8, 18, 12, 1], discovery: '1801', color: '#4b5563', config: '[Kr] 4d⁴ 5s¹', radius: 145, ionization: 652, electronegativity: 1.6, period: 5, group: 5, summary: 'A soft, grey, ductile transition metal.' },
  { number: 42, symbol: 'Mo', name: 'Molybdenum', mass: 95.95, category: 'Transition Metal', electrons: [2, 8, 18, 13, 1], discovery: '1778', color: '#fbbf24', config: '[Kr] 4d⁵ 5s¹', radius: 145, ionization: 684, electronegativity: 2.16, period: 5, group: 6, summary: 'A silvery metal with a gray cast.' },
  { number: 43, symbol: 'Tc', name: 'Technetium', mass: 98, category: 'Transition Metal', electrons: [2, 8, 18, 13, 2], discovery: '1937', color: '#10b981', config: '[Kr] 4d⁵ 5s²', radius: 136, ionization: 702, electronegativity: 1.9, period: 5, group: 7, summary: 'The lightest element whose isotopes are all radioactive.' },
  { number: 44, symbol: 'Ru', name: 'Ruthenium', mass: 101.07, category: 'Transition Metal', electrons: [2, 8, 18, 15, 1], discovery: '1844', color: '#6366f1', config: '[Kr] 4d⁷ 5s¹', radius: 134, ionization: 710, electronegativity: 2.2, period: 5, group: 8, summary: 'A rare transition metal belonging to the platinum group.' },
  { number: 45, symbol: 'Rh', name: 'Rhodium', mass: 102.91, category: 'Transition Metal', electrons: [2, 8, 18, 16, 1], discovery: '1803', color: '#8b5cf6', config: '[Kr] 4d⁸ 5s¹', radius: 134, ionization: 719, electronegativity: 2.28, period: 5, group: 9, summary: 'A rare, silvery-white, hard, corrosion-resistant transition metal.' },
  { number: 46, symbol: 'Pd', name: 'Palladium', mass: 106.42, category: 'Transition Metal', electrons: [2, 8, 18, 18], discovery: '1803', color: '#4b5563', config: '[Kr] 4d¹⁰', radius: 137, ionization: 804, electronegativity: 2.20, period: 5, group: 10, summary: 'A rare and lustrous silvery-white metal.' },
  { number: 47, symbol: 'Ag', name: 'Silver', mass: 107.87, category: 'Transition Metal', electrons: [2, 8, 18, 18, 1], discovery: 'Ancient', color: '#fbbf24', config: '[Kr] 4d¹⁰ 5s¹', radius: 144, ionization: 731, electronegativity: 1.93, period: 5, group: 11, summary: 'A soft, white, lustrous transition metal.' },
  { number: 48, symbol: 'Cd', name: 'Cadmium', mass: 112.41, category: 'Transition Metal', electrons: [2, 8, 18, 18, 2], discovery: '1817', color: '#10b981', config: '[Kr] 4d¹⁰ 5s²', radius: 151, ionization: 867, electronegativity: 1.69, period: 5, group: 12, summary: 'A soft, bluish-white metal.' },
  { number: 49, symbol: 'In', name: 'Indium', mass: 114.82, category: 'Post-transition Metal', electrons: [2, 8, 18, 18, 3], discovery: '1863', color: '#6366f1', config: '[Kr] 4d¹⁰ 5s² 5p¹', radius: 156, ionization: 558, electronegativity: 1.78, period: 5, group: 13, summary: 'A post-transition metal that is very soft and malleable.' },
  { number: 50, symbol: 'Sn', name: 'Tin', mass: 118.71, category: 'Post-transition Metal', electrons: [2, 8, 18, 18, 4], discovery: 'Ancient', color: '#8b5cf6', config: '[Kr] 4d¹⁰ 5s² 5p²', radius: 145, ionization: 708, electronegativity: 1.96, period: 5, group: 14, summary: 'A post-transition metal known for its malleability and resistance to corrosion.' },
  { number: 51, symbol: 'Sb', name: 'Antimony', mass: 121.76, category: 'Metalloid', electrons: [2, 8, 18, 18, 5], discovery: 'Ancient', color: '#4b5563', config: '[Kr] 4d¹⁰ 5s² 5p³', radius: 133, ionization: 834, electronegativity: 2.05, period: 5, group: 15, summary: 'A lustrous gray metalloid.' },
  { number: 52, symbol: 'Te', name: 'Tellurium', mass: 127.60, category: 'Metalloid', electrons: [2, 8, 18, 18, 6], discovery: '1782', color: '#fbbf24', config: '[Kr] 4d¹⁰ 5s² 5p⁴', radius: 123, ionization: 869, electronegativity: 2.1, period: 5, group: 16, summary: 'A brittle, mildly toxic metalloid.' },
  { number: 53, symbol: 'I', name: 'Iodine', mass: 126.90, category: 'Halogen', electrons: [2, 8, 18, 18, 7], discovery: '1811', color: '#10b981', config: '[Kr] 4d¹⁰ 5s² 5p⁵', radius: 115, ionization: 1008, electronegativity: 2.66, period: 5, group: 17, summary: 'A lustrous, purple-black nonmetal.' },
  { number: 54, symbol: 'Xe', name: 'Xenon', mass: 131.29, category: 'Noble Gas', electrons: [2, 8, 18, 18, 8], discovery: '1898', color: '#f59e0b', config: '[Kr] 4d¹⁰ 5s² 5p⁶', radius: 108, ionization: 1170, electronegativity: 0, period: 5, group: 18, summary: 'A colorless, dense, odorless noble gas.' },
  { number: 55, symbol: 'Cs', name: 'Cesium', mass: 132.91, category: 'Alkali Metal', electrons: [2, 8, 18, 18, 8, 1], discovery: '1860', color: '#ef4444', config: '[Xe] 6s¹', radius: 260, ionization: 376, electronegativity: 0.79, period: 6, group: 1, summary: 'A soft, gold-colored metal.' },
  { number: 56, symbol: 'Ba', name: 'Barium', mass: 137.33, category: 'Alkaline Earth Metal', electrons: [2, 8, 18, 18, 8, 2], discovery: '1808', color: '#10b981', config: '[Xe] 6s²', radius: 215, ionization: 502, electronegativity: 0.89, period: 6, group: 2, summary: 'A soft, silvery alkaline earth metal.' },
  { number: 57, symbol: 'La', name: 'Lanthanum', mass: 138.91, category: 'Lanthanide', electrons: [2, 8, 18, 18, 9, 2], discovery: '1839', color: '#6366f1', config: '[Xe] 5d¹ 6s²', radius: 195, ionization: 538, electronegativity: 1.10, period: 6, group: 3, summary: 'A soft, ductile, silvery-white metal.' },
  { number: 58, symbol: 'Ce', name: 'Cerium', mass: 140.12, category: 'Lanthanide', electrons: [2, 8, 18, 19, 9, 2], discovery: '1839', color: '#8b5cf6', config: '[Xe] 4f¹ 5d¹ 6s²', radius: 185, ionization: 534, electronegativity: 1.12, period: 6, group: 3, summary: 'A soft, silvery, ductile metal.' },
  { number: 59, symbol: 'Pr', name: 'Praseodymium', mass: 140.91, category: 'Lanthanide', electrons: [2, 8, 18, 21, 8, 2], discovery: '1885', color: '#4b5563', config: '[Xe] 4f³ 6s²', radius: 185, ionization: 527, electronegativity: 1.13, period: 6, group: 3, summary: 'A soft, silvery, malleable and ductile metal.' },
  { number: 60, symbol: 'Nd', name: 'Neodymium', mass: 144.24, category: 'Lanthanide', electrons: [2, 8, 18, 22, 8, 2], discovery: '1885', color: '#fbbf24', config: '[Xe] 4f⁴ 6s²', radius: 181, ionization: 533, electronegativity: 1.14, period: 6, group: 3, summary: 'A soft silvery metal that tarnishes in air.' },
  { number: 61, symbol: 'Pm', name: 'Promethium', mass: 145, category: 'Lanthanide', electrons: [2, 8, 18, 23, 8, 2], discovery: '1945', color: '#10b981', config: '[Xe] 4f⁵ 6s²', radius: 183, ionization: 540, electronegativity: 1.13, period: 6, group: 3, summary: 'A radioactive metal that does not occur naturally on Earth.' },
  { number: 62, symbol: 'Sm', name: 'Samarium', mass: 150.36, category: 'Lanthanide', electrons: [2, 8, 18, 24, 8, 2], discovery: '1879', color: '#6366f1', config: '[Xe] 4f⁶ 6s²', radius: 180, ionization: 544, electronegativity: 1.17, period: 6, group: 3, summary: 'A silvery metal that oxidizes in air.' },
  { number: 63, symbol: 'Eu', name: 'Europium', mass: 151.96, category: 'Lanthanide', electrons: [2, 8, 18, 25, 8, 2], discovery: '1901', color: '#8b5cf6', config: '[Xe] 4f⁷ 6s²', radius: 198, ionization: 547, electronegativity: 1.2, period: 6, group: 3, summary: 'A soft, silvery metal that is the least abundant of the rare earth elements.' },
  { number: 64, symbol: 'Gd', name: 'Gadolinium', mass: 157.25, category: 'Lanthanide', electrons: [2, 8, 18, 25, 9, 2], discovery: '1880', color: '#4b5563', config: '[Xe] 4f⁷ 5d¹ 6s²', radius: 179, ionization: 593, electronegativity: 1.2, period: 6, group: 3, summary: 'A silvery-white metal that is ductile and malleable.' },
  { number: 65, symbol: 'Tb', name: 'Terbium', mass: 158.93, category: 'Lanthanide', electrons: [2, 8, 18, 27, 8, 2], discovery: '1843', color: '#fbbf24', config: '[Xe] 4f⁹ 6s²', radius: 177, ionization: 566, electronegativity: 1.2, period: 6, group: 3, summary: 'A silvery-white metal that is malleable and ductile.' },
  { number: 66, symbol: 'Dy', name: 'Dysprosium', mass: 162.50, category: 'Lanthanide', electrons: [2, 8, 18, 28, 8, 2], discovery: '1886', color: '#10b981', config: '[Xe] 4f¹⁰ 6s²', radius: 178, ionization: 573, electronegativity: 1.22, period: 6, group: 3, summary: 'A soft, silvery metal that is relatively stable in air.' },
  { number: 67, symbol: 'Ho', name: 'Holmium', mass: 164.93, category: 'Lanthanide', electrons: [2, 8, 18, 29, 8, 2], discovery: '1878', color: '#6366f1', config: '[Xe] 4f¹¹ 6s²', radius: 176, ionization: 581, electronegativity: 1.23, period: 6, group: 3, summary: 'A relatively soft and malleable silvery metal.' },
  { number: 68, symbol: 'Er', name: 'Erbium', mass: 167.26, category: 'Lanthanide', electrons: [2, 8, 18, 30, 8, 2], discovery: '1842', color: '#8b5cf6', config: '[Xe] 4f¹² 6s²', radius: 175, ionization: 589, electronegativity: 1.24, period: 6, group: 3, summary: 'A silvery-white metal that is malleable and ductile.' },
  { number: 69, symbol: 'Tm', name: 'Thulium', mass: 168.93, category: 'Lanthanide', electrons: [2, 8, 18, 31, 8, 2], discovery: '1879', color: '#4b5563', config: '[Xe] 4f¹³ 6s²', radius: 173, ionization: 597, electronegativity: 1.25, period: 6, group: 3, summary: 'A silvery-gray metal that is the least abundant of the lanthanides.' },
  { number: 70, symbol: 'Yb', name: 'Ytterbium', mass: 173.04, category: 'Lanthanide', electrons: [2, 8, 18, 32, 8, 2], discovery: '1878', color: '#fbbf24', config: '[Xe] 4f¹⁴ 6s²', radius: 222, ionization: 603, electronegativity: 1.1, period: 6, group: 3, summary: 'A soft, malleable, and ductile metal.' },
  { number: 71, symbol: 'Lu', name: 'Lutetium', mass: 174.97, category: 'Lanthanide', electrons: [2, 8, 18, 32, 9, 2], discovery: '1907', color: '#10b981', config: '[Xe] 4f¹⁴ 5d¹ 6s²', radius: 172, ionization: 524, electronegativity: 1.27, period: 6, group: 3, summary: 'A silvery-white metal that is the densest and hardest of the lanthanides.' },
  { number: 72, symbol: 'Hf', name: 'Hafnium', mass: 178.49, category: 'Transition Metal', electrons: [2, 8, 18, 32, 10, 2], discovery: '1923', color: '#6366f1', config: '[Xe] 4f¹⁴ 5d² 6s²', radius: 159, ionization: 658, electronegativity: 1.3, period: 6, group: 4, summary: 'A lustrous, silvery-gray metal.' },
  { number: 73, symbol: 'Ta', name: 'Tantalum', mass: 180.95, category: 'Transition Metal', electrons: [2, 8, 18, 32, 11, 2], discovery: '1802', color: '#8b5cf6', config: '[Xe] 4f¹⁴ 5d³ 6s²', radius: 146, ionization: 761, electronegativity: 1.5, period: 6, group: 5, summary: 'A hard, blue-gray metal that is highly corrosion-resistant.' },
  { number: 74, symbol: 'W', name: 'Tungsten', mass: 183.84, category: 'Transition Metal', electrons: [2, 8, 18, 32, 12, 2], discovery: '1783', color: '#4b5563', config: '[Xe] 4f¹⁴ 5d⁴ 6s²', radius: 139, ionization: 770, electronegativity: 2.36, period: 6, group: 6, summary: 'A hard, rare metal known for its high melting point.' },
  { number: 75, symbol: 'Re', name: 'Rhenium', mass: 186.21, category: 'Transition Metal', electrons: [2, 8, 18, 32, 13, 2], discovery: '1925', color: '#fbbf24', config: '[Xe] 4f¹⁴ 5d⁵ 6s²', radius: 137, ionization: 760, electronegativity: 1.9, period: 6, group: 7, summary: 'A silvery-white metal with one of the highest melting points.' },
  { number: 76, symbol: 'Os', name: 'Osmium', mass: 190.23, category: 'Transition Metal', electrons: [2, 8, 18, 32, 14, 2], discovery: '1803', color: '#10b981', config: '[Xe] 4f¹⁴ 5d⁶ 6s²', radius: 135, ionization: 840, electronegativity: 2.2, period: 6, group: 8, summary: 'A hard, brittle, bluish-white transition metal.' },
  { number: 77, symbol: 'Ir', name: 'Iridium', mass: 192.22, category: 'Transition Metal', electrons: [2, 8, 18, 32, 15, 2], discovery: '1803', color: '#6366f1', config: '[Xe] 4f¹⁴ 5d⁷ 6s²', radius: 136, ionization: 880, electronegativity: 2.20, period: 6, group: 9, summary: 'A very hard, brittle, silvery-white transition metal.' },
  { number: 78, symbol: 'Pt', name: 'Platinum', mass: 195.08, category: 'Transition Metal', electrons: [2, 8, 18, 32, 17, 1], discovery: '1735', color: '#8b5cf6', config: '[Xe] 4f¹⁴ 5d⁹ 6s¹', radius: 139, ionization: 870, electronegativity: 2.28, period: 6, group: 10, summary: 'A dense, malleable, ductile, highly unreactive, precious, silverish-white transition metal.' },
  { number: 79, symbol: 'Au', name: 'Gold', mass: 196.97, category: 'Transition Metal', electrons: [2, 8, 18, 32, 18, 1], discovery: 'Ancient', color: '#fbbf24', config: '[Xe] 4f¹⁴ 5d¹⁰ 6s¹', radius: 144, ionization: 890, electronegativity: 2.54, period: 6, group: 11, summary: 'A  soft, dense, yellow, malleable, and ductile metal.' },
  { number: 80, symbol: 'Hg', name: 'Mercury', mass: 200.59, category: 'Transition Metal', electrons: [2, 8, 18, 32, 18, 2], discovery: 'Ancient', color: '#10b981', config: '[Xe] 4f¹⁴ 5d¹⁰ 6s²', radius: 151, ionization: 1007, electronegativity: 2.00, period: 6, group: 12, summary: 'A heavy, silvery d-block element that is the only metallic element that is liquid at standard conditions for temperature and pressure.' },
  { number: 81, symbol: 'Tl', name: 'Thallium', mass: 204.38, category: 'Post-transition Metal', electrons: [2, 8, 18, 32, 18, 3], discovery: '1861', color: '#6366f1', config: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p¹', radius: 156, ionization: 589, electronegativity: 1.62, period: 6, group: 13, summary: 'A soft gray post-transition metal that resembles tin but is more malleable.' },
  { number: 82, symbol: 'Pb', name: 'Lead', mass: 207.2, category: 'Post-transition Metal', electrons: [2, 8, 18, 32, 18, 4], discovery: 'Ancient', color: '#8b5cf6', config: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²', radius: 154, ionization: 715, electronegativity: 2.33, period: 6, group: 14, summary: 'A heavy metal that is denser than most common materials.' },
  { number: 83, symbol: 'Bi', name: 'Bismuth', mass: 208.98, category: 'Post-transition Metal', electrons: [2, 8, 18, 32, 18, 5], discovery: 'Ancient', color: '#4b5563', config: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p³', radius: 143, ionization: 703, electronegativity: 2.02, period: 6, group: 15, summary: 'A brittle metal with a silvery white color when freshly cut, but often has a pinkish tinge due to surface oxidation.' },
  { number: 84, symbol: 'Po', name: 'Polonium', mass: 209, category: 'Metalloid', electrons: [2, 8, 18, 32, 18, 6], discovery: '1898', color: '#fbbf24', config: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁴', radius: 135, ionization: 812, electronegativity: 2.0, period: 6, group: 16, summary: 'A rare and highly radioactive metalloid.' },
  { number: 85, symbol: 'At', name: 'Astatine', mass: 210, category: 'Halogen', electrons: [2, 8, 18, 32, 18, 7], discovery: '1940', color: '#10b981', config: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁵', radius: 127, ionization: 920, electronegativity: 2.2, period: 6, group: 17, summary: 'A rare and radioactive halogen.' },
  { number: 86, symbol: 'Rn', name: 'Radon', mass: 222, category: 'Noble Gas', electrons: [2, 8, 18, 32, 18, 8], discovery: '1900', color: '#f59e0b', config: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁶', radius: 120, ionization: 1037, electronegativity: 0, period: 6, group: 18, summary: 'A colorless, odorless, tasteless noble gas that is radioactive.' },
  { number: 87, symbol: 'Fr', name: 'Francium', mass: 223, category: 'Alkali Metal', electrons: [2, 8, 18, 32, 18, 8, 1], discovery: '1939', color: '#ef4444', config: '[Rn] 7s¹', radius: 270, ionization: 380, electronegativity: 0.7, period: 7, group: 1, summary: 'An extremely rare and highly radioactive metal.' },
  { number: 88, symbol: 'Ra', name: 'Radium', mass: 226, category: 'Alkaline Earth Metal', electrons: [2, 8, 18, 32, 18, 8, 2], discovery: '1898', color: '#10b981', config: '[Rn] 7s²', radius: 215, ionization: 509, electronegativity: 0.9, period: 7, group: 2, summary: 'A highly radioactive metal that glows faintly in the dark.' },
  { number: 89, symbol: 'Ac', name: 'Actinium', mass: 227, category: 'Actinide', electrons: [2, 8, 18, 32, 18, 9, 2], discovery: '1899', color: '#6366f1', config: '[Rn] 6d¹ 7s²', radius: 180, ionization: 499, electronegativity: 1.1, period: 7, group: 3, summary: 'A soft, silvery-white radioactive metal.' },
  { number: 90, symbol: 'Th', name: 'Thorium', mass: 232.04, category: 'Actinide', electrons: [2, 8, 18, 32, 18, 10, 2], discovery: '1829', color: '#8b5cf6', config: '[Rn] 6d² 7s²', radius: 175, ionization: 587, electronegativity: 1.3, period: 7, group: 3, summary: 'A weakly radioactive metallic element.' },
  { number: 91, symbol: 'Pa', name: 'Protactinium', mass: 231.04, category: 'Actinide', electrons: [2, 8, 18, 32, 20, 9, 2], discovery: '1913', color: '#4b5563', config: '[Rn] 5f² 6d¹ 7s²', radius: 175, ionization: 568, electronegativity: 1.5, period: 7, group: 3, summary: 'A dense, silvery-gray metal that is highly radioactive.' },
  { number: 92, symbol: 'U', name: 'Uranium', mass: 238.03, category: 'Actinide', electrons: [2, 8, 18, 32, 21, 9, 2], discovery: '1789', color: '#fbbf24', config: '[Rn] 5f³ 6d¹ 7s²', radius: 175, ionization: 597, electronegativity: 1.38, period: 7, group: 3, summary: 'A dense, silvery-gray metal that is weakly radioactive.' },
  { number: 93, symbol: 'Np', name: 'Neptunium', mass: 237, category: 'Actinide', electrons: [2, 8, 18, 32, 22, 9, 2], discovery: '1940', color: '#10b981', config: '[Rn] 5f⁴ 6d¹ 7s²', radius: 175, ionization: 604, electronegativity: 1.36, period: 7, group: 3, summary: 'A radioactive metal that is the first transuranic element.' },
  { number: 94, symbol: 'Pu', name: 'Plutonium', mass: 244, category: 'Actinide', electrons: [2, 8, 18, 32, 24, 8, 2], discovery: '1940', color: '#6366f1', config: '[Rn] 5f⁶ 7s²', radius: 175, ionization: 584, electronegativity: 1.28, period: 7, group: 3, summary: 'A radioactive metal used as a fuel in nuclear reactors and weapons.' },
  { number: 95, symbol: 'Am', name: 'Americium', mass: 243, category: 'Actinide', electrons: [2, 8, 18, 32, 25, 8, 2], discovery: '1944', color: '#8b5cf6', config: '[Rn] 5f⁷ 7s²', radius: 175, ionization: 578, electronegativity: 1.3, period: 7, group: 3, summary: 'A radioactive metal used in smoke detectors.' },
  { number: 96, symbol: 'Cm', name: 'Curium', mass: 247, category: 'Actinide', electrons: [2, 8, 18, 32, 25, 9, 2], discovery: '1944', color: '#4b5563', config: '[Rn] 5f⁷ 6d¹ 7s²', radius: 175, ionization: 581, electronegativity: 1.3, period: 7, group: 3, summary: 'A radioactive metal named after Marie and Pierre Curie.' },
  { number: 97, symbol: 'Bk', name: 'Berkelium', mass: 247, category: 'Actinide', electrons: [2, 8, 18, 32, 27, 8, 2], discovery: '1949', color: '#fbbf24', config: '[Rn] 5f⁹ 7s²', radius: 175, ionization: 601, electronegativity: 1.3, period: 7, group: 3, summary: 'A radioactive metal named after the city of Berkeley, California.' },
  { number: 98, symbol: 'Cf', name: 'Californium', mass: 251, category: 'Actinide', electrons: [2, 8, 18, 32, 28, 8, 2], discovery: '1950', color: '#10b981', config: '[Rn] 5f¹⁰ 7s²', radius: 175, ionization: 608, electronegativity: 1.3, period: 7, group: 3, summary: 'A radioactive metal named after the state of California.' },
  { number: 99, symbol: 'Es', name: 'Einsteinium', mass: 252, category: 'Actinide', electrons: [2, 8, 18, 32, 29, 8, 2], discovery: '1952', color: '#6366f1', config: '[Rn] 5f¹¹ 7s²', radius: 175, ionization: 619, electronegativity: 1.3, period: 7, group: 3, summary: 'A synthetic radioactive metal named after Albert Einstein.' },
  { number: 100, symbol: 'Fm', name: 'Fermium', mass: 257, category: 'Actinide', electrons: [2, 8, 18, 32, 30, 8, 2], discovery: '1952', color: '#8b5cf6', config: '[Rn] 5f¹² 7s²', radius: 175, ionization: 627, electronegativity: 1.3, period: 7, group: 3, summary: 'A synthetic radioactive metal named after Enrico Fermi.' },
  { number: 101, symbol: 'Md', name: 'Mendelevium', mass: 258, category: 'Actinide', electrons: [2, 8, 18, 32, 31, 8, 2], discovery: '1955', color: '#4b5563', config: '[Rn] 5f¹³ 7s²', radius: 175, ionization: 635, electronegativity: 1.3, period: 7, group: 3, summary: 'A synthetic radioactive metal named after Dmitri Mendeleev.' },
  { number: 102, symbol: 'No', name: 'Nobelium', mass: 259, category: 'Actinide', electrons: [2, 8, 18, 32, 32, 8, 2], discovery: '1958', color: '#fbbf24', config: '[Rn] 5f¹⁴ 7s²', radius: 175, ionization: 642, electronegativity: 1.3, period: 7, group: 3, summary: 'A synthetic radioactive metal named after Alfred Nobel.' },
  { number: 103, symbol: 'Lr', name: 'Lawrencium', mass: 262, category: 'Actinide', electrons: [2, 8, 18, 32, 32, 9, 2], discovery: '1961', color: '#10b981', config: '[Rn] 5f¹⁴ 6d¹ 7s²', radius: 175, ionization: 470, electronegativity: 1.3, period: 7, group: 3, summary: 'A synthetic radioactive metal named after Ernest O. Lawrence.' },
  { number: 104, symbol: 'Rf', name: 'Rutherfordium', mass: 267, category: 'Transition Metal', electrons: [2, 8, 18, 32, 32, 10, 2], discovery: '1969', color: '#6366f1', config: '[Rn] 5f¹⁴ 6d² 7s²', radius: 150, ionization: 580, electronegativity: 0, period: 7, group: 4, summary: 'A synthetic radioactive element named after Ernest Rutherford.' },
  { number: 105, symbol: 'Db', name: 'Dubnium', mass: 268, category: 'Transition Metal', electrons: [2, 8, 18, 32, 32, 11, 2], discovery: '1970', color: '#8b5cf6', config: '[Rn] 5f¹⁴ 6d³ 7s²', radius: 139, ionization: 0, electronegativity: 0, period: 7, group: 5, summary: 'A synthetic radioactive element named after Dubna, Russia.' },
  { number: 106, symbol: 'Sg', name: 'Seaborgium', mass: 271, category: 'Transition Metal', electrons: [2, 8, 18, 32, 32, 12, 2], discovery: '1974', color: '#4b5563', config: '[Rn] 5f¹⁴ 6d⁴ 7s²', radius: 132, ionization: 0, electronegativity: 0, period: 7, group: 6, summary: 'A synthetic radioactive element named after Glenn T. Seaborg.' },
  { number: 107, symbol: 'Bh', name: 'Bohrium', mass: 272, category: 'Transition Metal', electrons: [2, 8, 18, 32, 32, 13, 2], discovery: '1981', color: '#fbbf24', config: '[Rn] 5f¹⁴ 6d⁵ 7s²', radius: 128, ionization: 0, electronegativity: 0, period: 7, group: 7, summary: 'A synthetic radioactive element named after Niels Bohr.' },
  { number: 108, symbol: 'Hs', name: 'Hassium', mass: 270, category: 'Transition Metal', electrons: [2, 8, 18, 32, 32, 14, 2], discovery: '1984', color: '#10b981', config: '[Rn] 5f¹⁴ 6d⁶ 7s²', radius: 126, ionization: 0, electronegativity: 0, period: 7, group: 8, summary: 'A synthetic radioactive element named after the German state of Hesse.' },
  { number: 109, symbol: 'Mt', name: 'Meitnerium', mass: 276, category: 'Transition Metal', electrons: [2, 8, 18, 32, 32, 15, 2], discovery: '1982', color: '#6366f1', config: '[Rn] 5f¹⁴ 6d⁷ 7s²', radius: 121, ionization: 0, electronegativity: 0, period: 7, group: 9, summary: 'A synthetic radioactive element named after Lise Meitner.' },
  { number: 110, symbol: 'Ds', name: 'Darmstadtium', mass: 281, category: 'Transition Metal', electrons: [2, 8, 18, 32, 32, 17, 1], discovery: '1994', color: '#8b5cf6', config: '[Rn] 5f¹⁴ 6d⁹ 7s¹', radius: 118, ionization: 0, electronegativity: 0, period: 7, group: 10, summary: 'A synthetic radioactive element named after Darmstadt, Germany.' },
  { number: 111, symbol: 'Rg', name: 'Roentgenium', mass: 282, category: 'Transition Metal', electrons: [2, 8, 18, 32, 32, 18, 1], discovery: '1994', color: '#4b5563', config: '[Rn] 5f¹⁴ 6d¹⁰ 7s¹', radius: 113, ionization: 0, electronegativity: 0, period: 7, group: 11, summary: 'A synthetic radioactive element named after Wilhelm Conrad Röntgen.' },
  { number: 112, symbol: 'Cn', name: 'Copernicium', mass: 285, category: 'Transition Metal', electrons: [2, 8, 18, 32, 32, 18, 2], discovery: '1996', color: '#fbbf24', config: '[Rn] 5f¹⁴ 6d¹⁰ 7s²', radius: 122, ionization: 0, electronegativity: 0, period: 7, group: 12, summary: 'A synthetic radioactive element named after Nicolaus Copernicus.' },
  { number: 113, symbol: 'Nh', name: 'Nihonium', mass: 286, category: 'Post-transition Metal', electrons: [2, 8, 18, 32, 32, 18, 3], discovery: '2004', color: '#10b981', config: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p¹', radius: 136, ionization: 0, electronegativity: 0, period: 7, group: 13, summary: 'A synthetic radioactive element named after Japan (Nihon).' },
  { number: 114, symbol: 'Fl', name: 'Flerovium', mass: 289, category: 'Post-transition Metal', electrons: [2, 8, 18, 32, 32, 18, 4], discovery: '1998', color: '#6366f1', config: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p²', radius: 143, ionization: 0, electronegativity: 0, period: 7, group: 14, summary: 'A synthetic radioactive element named after the Flerov Laboratory of Nuclear Reactions.' },
  { number: 115, symbol: 'Mc', name: 'Moscovium', mass: 288, category: 'Post-transition Metal', electrons: [2, 8, 18, 32, 32, 18, 5], discovery: '2003', color: '#8b5cf6', config: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p³', radius: 138, ionization: 0, electronegativity: 0, period: 7, group: 15, summary: 'A synthetic radioactive element named after Moscow Oblast.' },
  { number: 116, symbol: 'Lv', name: 'Livermorium', mass: 293, category: 'Post-transition Metal', electrons: [2, 8, 18, 32, 32, 18, 6], discovery: '2000', color: '#4b5563', config: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁴', radius: 135, ionization: 0, electronegativity: 0, period: 7, group: 16, summary: 'A synthetic radioactive element named after the Lawrence Livermore National Laboratory.' },
  { number: 117, symbol: 'Ts', name: 'Tennessine', mass: 294, category: 'Halogen', electrons: [2, 8, 18, 32, 32, 18, 7], discovery: '2010', color: '#fbbf24', config: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁵', radius: 120, ionization: 0, electronegativity: 0, period: 7, group: 17, summary: 'A synthetic radioactive element named after the state of Tennessee.' },
  { number: 118, symbol: 'Og', name: 'Oganesson', mass: 294, category: 'Noble Gas', electrons: [2, 8, 18, 32, 32, 18, 8], discovery: '2002', color: '#10b981', config: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁶', radius: 116, ionization: 0, electronegativity: 0, period: 7, group: 18, summary: 'A synthetic radioactive element named after Yuri Oganessian.' },
];

export const MOLECULES: Molecule[] = [
  {
    formula: 'H2O',
    name: 'Water',
    centralAtom: 'O',
    atoms: [
      { symbol: 'H', pos: { x: 0.7, y: -0.6, z: 0.1 } },
      { symbol: 'H', pos: { x: -0.7, y: -0.6, z: 0.1 } },
    ],
    lonePairs: [
      { x: 0, y: 0.6, z: 0.75 },
      { x: 0, y: 0.6, z: -0.75 },
    ],
    realAngle: '104.5°',
    modelAngle: '109.5°',
  },
  {
    formula: 'CO2',
    name: 'Carbon Dioxide',
    centralAtom: 'C',
    atoms: [
      { symbol: 'O', pos: { x: 1, y: 0, z: 0 } },
      { symbol: 'O', pos: { x: -1, y: 0, z: 0 } },
    ],
    lonePairs: [],
    realAngle: '180°',
    modelAngle: '180°',
  },
  {
    formula: 'NH3',
    name: 'Ammonia',
    centralAtom: 'N',
    atoms: [
      { symbol: 'H', pos: { x: 0.9, y: -0.3, z: 0 } },
      { symbol: 'H', pos: { x: -0.45, y: -0.3, z: 0.78 } },
      { symbol: 'H', pos: { x: -0.45, y: -0.3, z: -0.78 } },
    ],
    lonePairs: [
      { x: 0, y: 1, z: 0 },
    ],
    realAngle: '107.0°',
    modelAngle: '109.5°',
  },
  {
    formula: 'CH4',
    name: 'Methane',
    centralAtom: 'C',
    atoms: [
      { symbol: 'H', pos: { x: 0, y: 1, z: 0 } },
      { symbol: 'H', pos: { x: 0.94, y: -0.33, z: 0 } },
      { symbol: 'H', pos: { x: -0.47, y: -0.33, z: 0.81 } },
      { symbol: 'H', pos: { x: -0.47, y: -0.33, z: -0.81 } },
    ],
    lonePairs: [],
    realAngle: '109.5°',
    modelAngle: '109.5°',
  },
  {
    formula: 'BF3',
    name: 'Boron Trifluoride',
    centralAtom: 'B',
    atoms: [
      { symbol: 'F', pos: { x: 0, y: 1, z: 0 } },
      { symbol: 'F', pos: { x: 0.86, y: -0.5, z: 0 } },
      { symbol: 'F', pos: { x: -0.86, y: -0.5, z: 0 } },
    ],
    lonePairs: [],
    realAngle: '120°',
    modelAngle: '120°',
  },
  {
    formula: 'SF6',
    name: 'Sulfur Hexafluoride',
    centralAtom: 'S',
    atoms: [
      { symbol: 'F', pos: { x: 0, y: 1.2, z: 0 } },
      { symbol: 'F', pos: { x: 0, y: -1.2, z: 0 } },
      { symbol: 'F', pos: { x: 1.2, y: 0, z: 0 } },
      { symbol: 'F', pos: { x: -1.2, y: 0, z: 0 } },
      { symbol: 'F', pos: { x: 0, y: 0, z: 1.2 } },
      { symbol: 'F', pos: { x: 0, y: 0, z: -1.2 } },
    ],
    lonePairs: [],
    realAngle: '90°, 180°',
    modelAngle: '90° (Octahedral)',
  },
  {
    formula: 'PCl5',
    name: 'Phosphorus Pentachloride',
    centralAtom: 'P',
    atoms: [
      { symbol: 'Cl', pos: { x: 0, y: 1.2, z: 0 } },
      { symbol: 'Cl', pos: { x: 0, y: -1.2, z: 0 } },
      { symbol: 'Cl', pos: { x: 1.2, y: 0, z: 0 } },
      { symbol: 'Cl', pos: { x: -1.2, y: 0, z: 0 } },
      { symbol: 'Cl', pos: { x: 0, y: 0, z: 1.2 } },
    ],
    lonePairs: [],
    realAngle: '90°, 120°',
    modelAngle: '90°, 120° (Trigonal Bipyramidal)',
  }
];
