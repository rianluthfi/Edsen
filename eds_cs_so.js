/**
 *@NApiVersion 2.x
 *@NScriptType ClientScript
 */
define(['N/currentRecord', 'N/record','N/format'],
    function(currentRecord, record, format) {
        function pageInit(context) {

        }
        function saveRecord(context) {
			var curRec = context.currentRecord;
			
			var curLine = curRec.getLineCount({
				sublistId : 'item'
			});
			
			var calPercent = 0;
			
			for (var i = 0; i < curLine; i++){
				var percent = curRec.getSublistValue({
					sublistId : 'item',
					fieldId : 'custcol_eds_percent',
					line : i
				});
				
				calPercent += percent;
			}
			
			if (calPercent > 100){
				alert('Total persentase tidak boleh lebih dari 100%, total persentase sekarang adalah '+calPercent+'%');
			}
			if (calPercent < 100){
				alert('Total persentase tidak boleh kurang dari 100%, total persentase sekarang adalah '+calPercent+'%');
			}
			if (calPercent === 100){
				return true;
			}
        }
        function validateField(context) {
			var curRec = context.currentRecord;
			var sublistName = context.sublistId;
			var fieldName = context.fieldId;
			
			if (sublistName === 'item'){
				if (fieldName === 'custcol_eds_percent'){
					
					// alert('testing');
					var contractValue = curRec.getValue('custbody_eds_contract_value');
					
					var percent = curRec.getCurrentSublistValue({
						sublistId : 'item',
						fieldId : 'custcol_eds_percent'
					});
					
					curRec.setCurrentSublistValue({
						sublistId : 'item',
						fieldId : 'amount',
						value : (percent/100) * (contractValue)
					});
				}
			}
			return true;
        }
        function fieldChanged(context) {
			
        }
        function postSourcing(context) {
			
        }
        function lineInit(context) {
			
        }
        function validateDelete(context) {

        }
        function validateInsert(context) {
			
        }
        function validateLine(context) {

        }
        function sublistChanged(context) {
			
        }
		
        return {
            // pageInit: pageInit,
            // fieldChanged: fieldChanged,
            // postSourcing: postSourcing,
            // sublistChanged: sublistChanged,
            // lineInit: lineInit,
            validateField: validateField,
            // validateLine: validateLine,
            // validateInsert: validateInsert,
            // validateDelete: validateDelete,
            saveRecord: saveRecord
        };
    });