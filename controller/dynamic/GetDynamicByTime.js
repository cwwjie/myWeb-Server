const dynamic = require('./model');
const lodash = require('lodash');

module.exports = async (ctx, next) => {
	let sequence = ctx.query.sequence || 'new';

    let myQurty = new Promise((resolve, reject) => {
        dynamic.find({}, (error, docs) => {
            if (error) {
                reject(error);
            }
            resolve(docs)
        });
    });

	let timeout = new Promise((resolve, reject) => {
        setTimeout(reject, 10000, "The qurty time is out");
    });

    await Promise.race([myQurty, timeout]).then((data) => {
		let sortList = [];

		if (data.length === 0) {
            ctx.body = {
                'result': 0,
                'data': [],
                'message': 'Database query success, But database is empty'
            };
            return
        }

		if (sequence === 'old') {
			sortList = quickSort(data, true);
		} else {
			sortList = quickSort(data, false);
		}

		ctx.body = {
			'result': 1,
			'data': lodash.take(sortList, 100),
			'message': 'Database is query success'
		};

    }, function (error) {
        ctx.body = {
            'result': 0,
            'data': null,
            'message': 'Database query error, The reason code is: ' + error
        };
    });
}


let quickSort = (data, sequence) => {
	let myArray = data,
		isIncrease = sequence || false; // 是否 升序 (从小到大) (从老到新) (默认不是)

	let swap = (array, indexA, indexB) => {
		var temp = array[indexA];
		array[indexA] = array[indexB];
		array[indexB] = temp;
	}
	
	let partition = (array, pivot, left, right) => {
		var storeIndex = left,
			pivotValue = array[pivot].date;
	
		swap(array, pivot, right);
	 
		for(var v = left; v < right; v++) {
	
			// 升序 从小到大 日期从古老到现代
			if (isIncrease) {
				if(array[v].date < pivotValue) {
					swap(array, v, storeIndex);
					storeIndex++;
				}
			// 降序 从大到小 日期从现代到古老
			} else {
				if(array[v].date > pivotValue) {
					swap(array, v, storeIndex);
					storeIndex++;
				}
			}
		}
	
		swap(array, right, storeIndex);
	
		return storeIndex;
	}
	
	let sort = (array, left, right) => {
		var pivot = null;
	
		if(typeof left !== 'number') {
			left = 0;
		}
	
		if(typeof right !== 'number') {
			right = array.length - 1;
		}
	
		if(left < right) {
			pivot     = left + Math.ceil((right - left) * 0.5);
			newPivot  = partition(array, pivot, left, right);

			sort(array, left, newPivot - 1);
			sort(array, newPivot + 1, right);
		}
	}

	sort(myArray);

	return myArray;
}

