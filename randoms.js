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
