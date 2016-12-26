myApp.service('csvWriterService',
    function() {
        function getCSVBodyArray(linesArr) {
            var arr = []
            for(var i = 0, len = linesArr.length; i < len; i++) {
                var propValues = getPropsValues(linesArr[i]);
                arr.push(composeLine(propValues, ','));
            }
            return arr;
        };
        
        function getCSVDocumentString(csvLineObjs, headers) {
            if(!objs || objs.length === 0) {
                throw "Cannot build CSV body - collection 'csvLineObjs' must be populated.";
            }
            var propsCount = Object.keys(objs[0]).length,
                csvLines = getCSVBodyArray(objs);

            if(headers && headers.length === propsCount) { 
               csvLines.unshift(composeLine(headers, ',')); 
            }
            return csvLines.join(' ');
        }

        function getPropsValues(obj) {
            var props = Object.keys(obj);
            return props.map(function(prop) {
                                return obj[prop] || '';
                            });
        }
 
        function composeLine(strArr, delimiter) {
            return strArr.join(delimiter) + '\r\n';
        }

        return {
            getCSVDocumentString: getCSVDocumentString
        };
    });

Array.prototype.groupByPropsName = function(propsToGroupBy, setItemFunc, getItemFunc){
    var map = new Map();
    for(var i = 0; i < this.length; i++) {
        var item = this[i],
            key =  propsToGroupBy.map(function(prop) { 
                return item[prop]; 
            }).join('_');    

        if(!map.has(key)) {
            map.set(key, setItemFunc ? setItemFunc(item) : [ item ]);
            continue;
        } 

        getItemFunc ? getItemFunc(map, key, item) : map.get(key).push(item);
    }
    return map.toArray();
};

function setItemFunc(item) {
    return { 
        agreement: item['agreement'],
        totalAmountPledgedUSD: item['totalAmountPledgedUSD'],
        marginAmount: item['marginAmount'],
        mid: item['mid'],
        ctid: item['ctid'],
        subItems: [item] 
    };
}

function getItemFunc(map, key, item) {
    map.get(key).subItems.push(item);
}


