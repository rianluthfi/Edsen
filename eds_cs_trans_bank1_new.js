/**
 *@NApiVersion 2.x
 *@NScriptType ClientScript
 */
define(['N/currentRecord', 'N/record','N/format','N/runtime'],
    function(currentRecord, record, format, runtime) {
        function pageInit(context) {
			
        }
        function saveRecord(context) {
			var curRec = context.currentRecord;
			var userObj = runtime.getCurrentUser () ;
			// alert ('user' +userObj.role);
			
			var curLineExp = curRec.getLineCount({
				sublistId : 'expense',
			});
			
			var curLineItem = curRec.getLineCount({
				sublistId : 'item',
			});
			
			var amount = 0;
			
			for (var i = 0; i < curLineExp; i++){
				var debit = curRec.getSublistValue({
					sublistId : 'expense',
					fieldId : 'amount',
					line : i
				});
				
				amount += debit;
			
			}	
			for (var i = 0; i < curLineItem; i++){
				var debit = curRec.getSublistValue({
					sublistId : 'item',
					fieldId : 'amount',
					line : i
				});
				
				amount += debit;
			}
			
			// ID		Department Name
			// 2		Finance
			// 3		Accounting
			// 4		Human Resources
			
			// ID		Role Name
			// 1003		Acconting
			// 1005		Finance
			// 1006		Human Resources
			
			// var department = curRec.getValue('department');
			var userRole = runtime.getCurrentUser().role;
			
			// if (department == 2 || department == 3 || department == 4){
				// return true;
			// }
			
			if (userRole == 1003 || userRole == 1005|| userRole == 1006) {
				return true;
			}
			else{
				if (amount > 2000000){
					alert('Selain Department Finance, Accounting & HRD, tidak diperkenankan melakukan transaksi lebih dari 2 Juta Rupiah !');
				}
				else if (amount <= 2000000){
					return true;
				}
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