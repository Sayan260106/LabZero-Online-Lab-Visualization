import axios from 'axios';
import { Molecule } from '../types/types';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

export const getMolecules = async (): Promise<Molecule[]> => {
  try {
    const response = await axios.get<any[]>(`${API_URL}/molecules/`);
    // Map backend snake_case to frontend camelCase
    return response.data.map(m => ({
      ...m,
      centralAtom: m.central_atom || m.centralAtom,
      atoms: (m.atoms || []).map((a: any) => ({
        symbol: a.symbol,
        pos: { x: a.x, y: a.y, z: a.z }
      })),
      lonePairs: m.lonePairs || (m.lone_pairs || []).map((lp: any) => ({
        x: lp.x, y: lp.y, z: lp.z
      })),
      realAngle: m.realAngle || m.real_angle,
      modelAngle: m.modelAngle || m.model_angle
    }));
  } catch (error) {
    console.error("Error fetching molecules:", error);
    throw error;
  }
};
