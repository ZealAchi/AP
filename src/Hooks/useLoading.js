import { useState } from 'react';
export function useLoading() {
	const [ state, setState ] = useState({
        Loading:true,
        type:'Screen' //Screen && Icon
    });
	return{
		state,
		setState,
	};
}
