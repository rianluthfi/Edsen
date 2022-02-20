/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */

define(['N/record', 'N/ui/serverWidget', 'N/runtime'],

function(record, serverWidget, runtime) {
   
    /**
     * Function definition to be triggered before record is loaded.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.newRecord - New record
     * @param {string} scriptContext.type - Trigger type
     * @param {Form} scriptContext.form - Current form
     * @Since 2015.2
     */
    function beforeLoad(context) {

    }

    /**
     * Function definition to be triggered before record is loaded.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.newRecord - New record
     * @param {Record} scriptContext.oldRecord - Old record
     * @param {string} scriptContext.type - Trigger type
     * @Since 2015.2
     */
    function beforeSubmit(context) {

    }

    /**
     * Function definition to be triggered before record is loaded.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.newRecord - New record
     * @param {Record} scriptContext.oldRecord - Old record
     * @param {string} scriptContext.type - Trigger type
     * @Since 2015.2
     */
    function afterSubmit(context) {
		var newRecord = context.newRecord;
		
		if (context.type === context.UserEventType.CREATE || context.type === context.UserEventType.EDIT){
			var currency = newRecord.getValue('currency');

			var taxtotal = newRecord.getValue('taxtotal');
			var total = newRecord.getValue('total');
			var subtotal = total-taxtotal;
			
			log.debug('subtotal' +subtotal +'taxtotal' +taxtotal +'total' +total);
			var idVendBill = context.newRecord.id;
			
			var masterVendBill = record.load({
				type: record.Type.VENDOR_BILL, 
				id: idVendBill,
				isDynamic: true,
			});
			//Terbilang Normal
			masterVendBill.setValue('custbody_eds_in_word', inWord(total)+' '+inCurrency(currency));
			
			//Terbilang PPN
			// var totalPPN = subtotal + (subtotal * 0.1);
			// masterVendBill.setValue('custbody_eds_in_word_ppn', inWord(totalPPN)+' '+inCurrency(currency));
			masterVendBill.save();
		}
	}
	
	function inCurrency(value){
		var currency;
		switch(value){
			case '1':
				currency = 'Rupiah';
				break;
			case '2':
				currency = 'Dollars';
				break;
			case '3':
				currency = 'Canadian Dollars';
				break;
			case '4':
				currency = 'Euro';
				break;
			case '5':
				currency = 'Singapore Dollars';
				break;
			default:
			currency = '';
				break;
		}
		return currency;
	}
	
	function inWord(value){
		var word;
		var decimal1 = value.toString().slice(-3);
		var decimal2 = value.toString().slice(-2);
		var point1 = decimal1.charAt(0);
		var point2 = decimal2.charAt(0);
		if (point1 == '.'){
			log.debug('Decimal Number on Point 1');
			var angka = toTitleCase(int_to_words(Math.floor(value)));
			log.debug('nilai Angka '+angka);
			var decimal = toTitleCase(int_to_words(parseInt(value.toString().slice(-2))));
			word = angka+' Point '+decimal;
		}
		else if (point2 == '.'){
			log.debug('Decimal Number on Point 2');
			var angka = toTitleCase(int_to_words(Math.floor(value)));
			var decimal = toTitleCase(int_to_words(parseInt(value.toString().slice(-1))));
            log.debug('nilai Angka '+angka+' nilai desimal '+decimal);
            word = angka+' Point '+decimal;
		}
		else{
			log.debug('Non Decimal Number');
			word = toTitleCase(int_to_words(value));
		}
		return word;
	}
	
	function isLeapYear(year) { 
		return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)); 
	}

	function getDaysInMonth(year, month) {
		return [31, (isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
	}

	function addMonths(date, value) {
		var d = new Date(date),
			n = date.getDate();
		d.setDate(1);
		d.setMonth(d.getMonth() + value);
		d.setDate(Math.min(n, getDaysInMonth(d.getFullYear(), d.getMonth())));
		return d;
	}
	
	function toTitleCase(str) {
		return str.replace(/\w\S*/g, function(txt){
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		});
	}
	
	function int_to_words(int) {
	  if (int === 0) return 'zero';

	  var ONES  = ['','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
	  var TENS  = ['','','twenty','thirty','fourty','fifty','sixty','seventy','eighty','ninety'];
	  var SCALE = ['','thousand','million','billion','trillion','quadrillion','quintillion','sextillion','septillion','octillion','nonillion'];

	  // Return string of first three digits, padded with zeros if needed
	  function get_first(str) {
		return ('000' + str).substr(-3);
	  }

	  // Return string of digits with first three digits chopped off
	  function get_rest(str) {
		return str.substr(0, str.length - 3);
	  }

	  // Return string of triplet convereted to words
	  function triplet_to_words(_3rd, _2nd, _1st) {
		return (_3rd == '0' ? '' : ONES[_3rd] + ' hundred ') + (_1st == '0' ? TENS[_2nd] : TENS[_2nd] && TENS[_2nd] + '-' || '') + (ONES[_2nd + _1st] || ONES[_1st]);
	  }

	  // Add to words, triplet words with scale word
	  function add_to_words(words, triplet_words, scale_word) {
		return triplet_words ? triplet_words + (scale_word && ' ' + scale_word || '') + ' ' + words : words;
	  }

	  function iter(words, i, first, rest) {
		if (first == '000' && rest.length === 0) return words;
		return iter(add_to_words(words, triplet_to_words(first[0], first[1], first[2]), SCALE[i]), ++i, get_first(rest), get_rest(rest));
	  }

	  return iter('', 0, get_first(String(int)), get_rest(String(int)));
	}
	
	function monthToRomawi(month){
		var romawi;
		switch(month){
			case 1:
				romawi = 'I';
				break;
			case 2:
				romawi = 'II';
				break;
			case 3:
				romawi = 'III';
				break;
			case 4:
				romawi = 'IV';
				break;
			case 5:
				romawi = 'V';
				break;
			case 6:
				romawi = 'VI';
				break;
			case 7:
				romawi = 'VII';
				break;
			case 8:
				romawi = 'VIII';
				break;
			case 9:
				romawi = 'IX';
				break;
			case 10:
				romawi = 'X';
				break;
			case 11:
				romawi = 'XI';
				break;
			case 12:
				romawi = 'XII';
				break;
			default:
				break;
		}
		return romawi;
	}
	
	function terbilang(bilangan) {

		bilangan    = String(bilangan);
		var angka   = new Array('0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0');
		var kata    = new Array('','Satu','Dua','Tiga','Empat','Lima','Enam','Tujuh','Delapan','Sembilan');
		var tingkat = new Array('','Ribu','Juta','Milyar','Triliun');

		var panjang_bilangan = bilangan.length;

		/* pengujian panjang bilangan */
		if (panjang_bilangan > 15) {
			kaLimat = "Diluar Batas";
			return kaLimat;
		}

		/* mengambil angka-angka yang ada dalam bilangan, dimasukkan ke dalam array */
		for (i = 1; i <= panjang_bilangan; i++) {
			angka[i] = bilangan.substr(-(i),1);
		}

		i = 1;
		j = 0;
		kaLimat = "";


		/* mulai proses iterasi terhadap array angka */
		while (i <= panjang_bilangan) {

			subkaLimat = "";
			kata1 = "";
			kata2 = "";
			kata3 = "";

			/* untuk Ratusan */
			if (angka[i+2] != "0") {
				if (angka[i+2] == "1") {
					kata1 = "Seratus";
				} else {
					kata1 = kata[angka[i+2]] + " Ratus";
				}
			}

			/* untuk Puluhan atau Belasan */
			if (angka[i+1] != "0") {
				if (angka[i+1] == "1") {
					if (angka[i] == "0") {
						kata2 = "Sepuluh";
					} else if (angka[i] == "1") {
						kata2 = "Sebelas";
					} else {
						kata2 = kata[angka[i]] + " Belas";
					}
				} else {
					kata2 = kata[angka[i+1]] + " Puluh";
				}
			}

			/* untuk Satuan */
			if (angka[i] != "0") {
				if (angka[i+1] != "1") {
					kata3 = kata[angka[i]];
				}
			}

			/* pengujian angka apakah tidak nol semua, lalu ditambahkan tingkat */
			if ((angka[i] != "0") || (angka[i+1] != "0") || (angka[i+2] != "0")) {
				subkaLimat = kata1+" "+kata2+" "+kata3+" "+tingkat[j]+" ";
			}

			/* gabungkan variabe sub kaLimat (untuk Satu blok 3 angka) ke variabel kaLimat */
			kaLimat = subkaLimat + kaLimat;
			i = i + 3;
			j = j + 1;
		}

		/* mengganti Satu Ribu jadi Seribu jika diperlukan */
		if ((angka[5] == "0") && (angka[6] == "0")) {
			kaLimat = kaLimat.replace("Satu Ribu","Seribu");
		}

		return kaLimat + "Rupiah";
	}
	
    return {
        // beforeLoad: beforeLoad,
        // beforeSubmit: beforeSubmit,
        afterSubmit: afterSubmit
    };
    
});
