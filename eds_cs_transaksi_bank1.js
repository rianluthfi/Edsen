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
				sublistId : 'line'
			});
			
			var amount = 0;
			
			for (var i = 0; i < curLine; i++){
				var debit = curRec.getSublistValue({
					sublistId : 'line',
					fieldId : 'amount',
					line : i
				});
				
				amount += debit;
			}
			
			if (amount > 2000000){
				alert('Untuk Transaksi diatas Rp. 2.000.000,- silahkan gunakan Purchase Requisitions');
			}
			else if (amount <= 2000000){
				// alert('Ke Trigger');
				return true;
			}
        }
        function validateField(context) {
			
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
            // validateField: validateField,
            // validateLine: validateLine,
            // validateInsert: validateInsert,
            // validateDelete: validateDelete,
            saveRecord: saveRecord
        };
    });