window.addEventListener('load', () => {
	const jsonInput = document.querySelector('#json-input');
	const csvInput = document.querySelector('#csv-input');

	let timeout;

	jsonInput.addEventListener('input', (event) => {
		if (timeout) {
			clearTimeout(timeout);
		}

		timeout = setTimeout(() => {
			const input = event.target.value;

			try {
				const parsedInput = JSON.parse(input); // everything gotta be double quoted, no trailing commas

				jsonInput.value = JSON.stringify(parsedInput, undefined, 4); // auto formats json input

				let data = '';

				if (Array.isArray(parsedInput)) {
					// data += Object.keys(parsedInput[0]).toString().slice(0, parsedInput[0].length) + '\n';
					data += Object.keys(parsedInput[0]).toString() + '\n';

					parsedInput.map((item) => {
						// data += Object.values(item).toString().slice(0, item.length) + '\n';
						data += Object.values(item).toString() + '\n';
					});

					csvInput.value = data;
					return;
				}

				// data += Object.keys(parsedInput).toString().slice(0, parsedInput.length) + '\n';
				data += Object.keys(parsedInput).toString() + '\n';

				// data += Object.values(parsedInput).toString().slice(0, parsedInput.length) + '\n';
				data += Object.values(parsedInput).toString() + '\n';

				csvInput.value = data;
				return;
			} catch (err) {
				console.log(err);

				// todo: display error on screen
			}
		}, 2500);
	});

	csvInput.addEventListener('input', (event) => {
		if (timeout) {
			clearTimeout(timeout);
		}

		timeout = setTimeout(() => {
			const input = event.target.value;

			// TODO: validate csv input

			let arrData = [];
			let objData = {};

			const csvSplitted = input.split(/\n/);

			const keys = input.split(/\n/)[0].split(',');
			const values = input.split(/\n/).slice(1, input.length);

			if (csvSplitted.length === 2) {
				let tempObj = {};

				keys.map((key, index) => {
					tempObj = { ...tempObj, [key]: values[0].split(',')[index] };
				});

				objData = { ...objData, ...tempObj };

				jsonInput.value = JSON.stringify(objData, undefined, 4);
				return;
			}

			values.map((value) => {
				let tempObj = {};

				const newValues = value.split(',');

				keys.map((key, index) => {
					tempObj = { ...tempObj, [key]: newValues[index] };
				});
				arrData.push(tempObj);
			});

			jsonInput.value = JSON.stringify(arrData, undefined, 4);
			return;
		}, 2500);
	});

	/** ---------- */
	const jsonFileInput = document.querySelector('#json-file-input');
	const csvFileInput = document.querySelector('#csv-file-input');

	jsonFileInput.addEventListener('change', (event) => {
		if (event.target.files.length > 1) {
			alert('Multiple files not supported...');
		}

		const file = event.target.files[0];
		// const reader = new FileReader();

		// reader.onload((file) => {
			
		// });
	});

	csvFileInput.addEventListener('change', (event) => {
		if (event.target.files.length > 1) {
			alert('Multiple files not supported...');
		}

		const file = event.target.files[0];
	});
});
