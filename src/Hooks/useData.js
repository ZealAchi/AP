import { useState } from 'react';

export function useData() {
    const [state, setState] = useState(null)
    return { state, setState }
}