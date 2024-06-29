


const scriptsInEvents = {

	async Shared_Event9_Act2(runtime, localVars)
	{
		self.addEventListener('keydown', ev => {
		    if (['ArrowDown', 'ArrowUp', ' '].includes(ev.key)) {
		        ev.preventDefault();
		    }
		});
		self.addEventListener('wheel', ev => ev.preventDefault(), { passive: false });
	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

