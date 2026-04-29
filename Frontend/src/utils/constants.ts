
import { ElementData, Molecule, Subject, SubjectId, TopicId } from '../types/types';

export const SUBJECTS: Subject[] = [
  {
    id: SubjectId.CHEMISTRY,
    name: 'Chemistry',
    icon: 'Beaker',
    color: 'emerald',
    targetClass: ['Class 11', 'Class 12'],
    topics: [
      {
        id: TopicId.ATOMIC_STRUCTURE,
        name: 'Atomic Structure',
        description: 'Explore the building blocks of matter, from subatomic particles to electron orbitals.',
        targetClass: ['Class 11'],
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
        targetClass: ['Class 11'],
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
        targetClass: ['Class 11'],
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
        targetClass: ['Class 12'],
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
        targetClass: ['Class 12'],
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
        targetClass: ['Class 12'],
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
    targetClass: ['Class 11', 'Class 12'],
    topics: [
      {
        id: TopicId.MECHANICS,
        name: 'Classical Mechanics',
        description: 'Study motion, forces, and energy in the macroscopic world.',
        targetClass: ['Class 12'],
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
        targetClass: ['Class 11'],
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
  color: 'indigo',
  targetClass: ['Class 9', 'Class 10', 'Class 11', 'Class 12'],
  topics: [
    {
      id: TopicId.VECTOR_CALCULUS,
      name: 'Vector Algebra',
      description: 'Visualize 3D vectors, cross products, and orthogonal planes.',
      targetClass: ['Class 12'],
      theory: `
# Vector Cross Product
In 3D space, the cross product of two vectors **A** and **B** is a new vector **C** that is perfectly perpendicular (90 degrees) to both of them.

## Geometric Properties
- **Direction**: Determined by the **Right-Hand Rule**. If you curl your fingers from A to B, your thumb points in the direction of the Cross Product.
- **Magnitude**: The length of the resulting vector represents the area of the parallelogram formed by vectors A and B.
- **Formula**: **A × B = |A| |B| sin(θ) n**

## CSE Applications
This is the backbone of 3D lighting! It is used to calculate "surface normals" to determine how light bounces off a 3D model.
      `
    },
    {
  id: TopicId.PI_APPROXIMATION,
  name: 'Approximating Pi',
  description: 'Use the Archimedes method to calculate π by increasing polygon sides.',
  targetClass: ['Class 10'],
  theory: `
# Archimedes' Method
Archimedes discovered that you could find the value of **π** by "trapping" a circle between two polygons.

## The Limit Concept
- A **Hexagon** (n = 6) is a poor approximation of a circle.
- A **Myriagon** (n = 10,000) is almost indistinguishable from a circle.
- As the number of sides (n) approaches infinity, the ratio of the Perimeter to the Diameter approaches **π**.

## The Calculation
For a circle with radius r = 1:

**Perimeter = n × sin(180/n) × 2**

As n approaches infinity, **Perimeter → 2π**.
  `
},

{
    id: TopicId.COMPLEX_NUMBERS,
    targetClass: ['Class 11'],
    name: 'Complex Numbers & Rotation',
    description: 'Explore the Argand plane and watch how multiplying by imaginary numbers rotates space.',
    theory: `
# The Argand Plane
A complex number like **Z = a + bi** has two parts: a Real part (a) and an Imaginary part (b). Instead of a standard XY graph, we plot these on the **Argand Plane**, where the X-axis is Real and the Y-axis is Imaginary.

## The Magic of 'i'
The imaginary unit **i** is defined as the square root of -1 (**i² = -1**). 
But geometrically, multiplying any number by **i** does exactly one thing: it rotates that number perfectly **90 degrees counter-clockwise** around the origin!

* 1 × i = **i** (90° rotation)
* i × i = **-1** (180° rotation)
* -1 × i = **-i** (270° rotation)
* -i × i = **1** (360° back to the start)

## CSE Application
Complex numbers are the mathematical engine behind signal processing (Fourier Transforms). Every time your phone compresses an MP3 file or processes a JPEG image, it is using complex numbers to analyze frequencies!
    `
  },
  {
    id: TopicId.PYTHAGORAS_THEOREM,
    targetClass: ['Class 9'],
    name: 'Pythagorean Theorem',
    description: 'Adjust the base and height of a triangle to visualize how the hypotenuse is calculated.',
    theory: `
# The Pythagorean Theorem
In any right-angled triangle, the square of the longest side (the hypotenuse) is equal to the sum of the squares of the other two sides.

## The Formula
**a² + b² = c²**

* **a** = Base (horizontal side)
* **b** = Height (vertical side)
* **c** = Hypotenuse (the long diagonal side)

To find the exact length of the hypotenuse, we just take the square root of that sum:
**c = √(a² + b²)**

## CSE Application
In video game development, this exact math is used every single frame to calculate the "Distance" between two players or objects on a 2D map. It is the absolute foundation of spatial programming!
    `
  },
  ]
},
  {
    id: SubjectId.BIOLOGY,
    name: 'Biology',
    icon: 'Beaker', 
    color: 'emerald',
    targetClass: ['Class 11', 'Class 12'],
    topics: [
      {
        id: TopicId.MICROBIOLOGY,
        name: 'Microorganisms',
        description: 'Analyze the 3D structure and movement mechanisms of a single-celled bacterium.',
        targetClass: ['Class 11'],
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
        targetClass: ['Class 12'],
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

