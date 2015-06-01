/* ИСХОДНЫЙ КОД от phonegap */

var app = {
    // Application Constructor
    initialize: function() {
        this.onEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
/* КОНЕЦ - ИСХОДНЫЙ КОД от phonegap */


jQuery(document).ready(function () {
//
//
//
//
// --------------------------------------------- / СТАРТОВЫЕ СЦЕНАРИИ + ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ / --------------------------------------------------- //     
//
//
//
//
//
/* ШИРИНА и ВЫСОТА РАБОЧЕЙ ОБЛАСТИ */

        var height_screen = window.innerHeight; // присваевает переменной высоту экрана устройства
        var local_display_height = window.localStorage.getItem("display_height");
        
        if(height_screen > local_display_height){
            window.localStorage.setItem("display_height", height_screen);
            local_display_height = window.localStorage.getItem("display_height");
        };
        
        $("#wrapper, #html, #body, .all_modals, .wr_menu").css({"height":local_display_height + "px"}); // высота приложения задается в css 100%, при этом когда раскрывается клавиатра в приложение все элементы сужаются, данная функция задаем минимальную высоту
        $(".menu_modal, .wr_menu_content").css({"height":local_display_height / 100 * 76 +"px"});
 
        var width_screen = window.innerWidth; // присваевает переменной высоту экрана устройства
        var font_size_6 = Math.floor(width_screen / 300 * 6) + "px"; // Выставляем размер шрифта в соответствии с шириной экрана
        var font_size_8 = Math.floor(width_screen / 300 * 8) + "px";
        var font_size_10 = Math.floor(width_screen / 300 * 10) + "px";
        var font_size_12 = Math.floor(width_screen / 300 * 12) + "px";
        var font_size_14 = Math.floor(width_screen / 300 * 14) + "px";
        var font_size_16 = Math.floor(width_screen / 300 * 16) + "px";
        var font_size_18 = Math.floor(width_screen / 300 * 18) + "px";
/* КОНЕЦ - ШИРИНА и ВЫСОТА РАБОЧЕЙ ОБЛАСТИ */

/* ФУНКЦИЯ ПОДСТАНОВКИ ШРИФТОВ */
        function new_fonts () {    
            if(width_screen >= 200){ // Подставляем переменные с размером шрифтов 
                //alert( "Размер экрана: " + width_screen + "   размер шрифта 10: " + font_size_10  + "   размер шрифта 12: " + font_size_12  + "   размер шрифта 14: " + font_size_14 + "   размер шрифта 17: " + font_size_17 + "   размер шрифта 20: " + font_size_20);
                $(".css_font_size_6").css({"font-size":font_size_6});
                $(".css_font_size_8").css({"font-size":font_size_8});
                $(".css_font_size_10").css({"font-size":font_size_10});
                $(".css_font_size_12").css({"font-size":font_size_12});
                $(".css_font_size_14").css({"font-size":font_size_14});
                $(".css_font_size_16").css({"font-size":font_size_16});
                $(".css_font_size_18").css({"font-size":font_size_18});
            };
        };
        new_fonts(); // запускаем функцию
/* КОНЕЦ - ФУНКЦИЯ ПОДСТАНОВКИ ШРИФТОВ */

/* ЗАМЕНА СТАНДАРТНОГО ALERT */
        function alert (alert_text, alert_head) {
            close_all_modals();
            zalivka_active ();
            $(".new_alert_modal").css({"display":"block"});
            $('.new_alert_modal .all_modals_content').text("").text(alert_text);
            $('.new_alert_modal .all_modal_head').text("").text(alert_head);
        }
        
        function alert_mini (alert_mini_text) {
            close_all_modals();
            $(".new_alert_mini_modal").css({"display":"block"});
            $('.all_modals_mini_content').text("").text(alert_mini_text);
        }
/* конец - ЗАМЕНА СТАНДАРТНОГО ALERT */

/* ГЛАБАЛЬНЫЕ ПЕРЕМЕННЫЕ */
    
    /* Переменные для поиска и фильтров */
        var spisok_restoranov = new XMLHttpRequest();                       //создаем новый объект
        var storage = window.localStorage;								    // сюда мы будем запоминать номер телефона
        var favorites = window.localStorage.getItem("favorites");  
		//window.localStorage.clear();
        var bin = new XMLHttpRequest();
        var x, spisok_bin;
		var spisok_bin_flag = false;
        var filtr_rest = new Array(0);                                      //список отфильтрованных ресторанов
    /* Конец - Переменные для поиска и фильтров */

        var value = window.localStorage.getItem("tel");                     //берем из localStorage номер телефона
        var mas_back_but = new Array(0);                                    // Создаем массив куда будем записывать историю переходов по страницам

        var avtorizaciya_active = false;

        var zalivka_on = false;
        var content_str_reg_on = false;
        var content_vse_restorani_on = false;
        var content_zabronirovat_stol_on = false;
        var content_str_filtr_on = false;
        var content_pokazat_na_karte_on = false;
        var content_izbrannoe_on = false;
        var content_moi_broni_on = false;
        var content_moi_dannie_on = false;
        var content_str_restorana_on = false;

        function XLM_update(){ //подгружаем данные из XML в переменную
            spisok_restoranov.open('GET', "http://test_to_app.zakazstolov24.ru/base_cw_rest.xml", true); //берем информацию из файла
            spisok_restoranov.onreadystatechange = function (aEvt) {    // после загразки информации
                if (spisok_restoranov.readyState === 4) {               // если все прошло хорошо
                    if(spisok_restoranov.status === 200){               // начинаем ее обработку
                        x = spisok_restoranov.responseXML;              //берем в формате XML
                                    var vse_resto = x.getElementsByTagName('R_ID');
                                    for (var i = 0; i < vse_resto.length; i++){
                                            var r_id =  x.getElementsByTagName('R_ID')[i].childNodes[0].nodeValue;
                                            filtr_rest[filtr_rest.length] = r_id;
                                    }
                    }
                    else {
                      //  alert("Забронировать столик вы можете по телефону : +7 (495) 722-00-23", "Нет соединение с интернетом"); //если информация не загрузилась сообщаем об этом
                    }
                }
            };  
            spisok_restoranov.send(''); // завершаем обработку файла
			
			bin.open('GET', "http://test_to_app.zakazstolov24.ru/base_bin.xml", true); //берем информацию из файла
			bin.onreadystatechange = function (aEvt) { // после загразки информации
				if (bin.readyState === 4) { // если все прошло хорошо
					if(bin.status === 200){ // начинаем ее обработку
						spisok_bin = bin.responseXML; //берем в формате XML
						spisok_bin_flag = true;
					}
				}
			};
			bin.send(''); // завершаем обработку файла
        };
        XLM_update();
		
		
		
        document.addEventListener("online", onOnline, true); //если пользователь online
        function onOnline() {
            XLM_update(); // то обновляем данные из XML
        };
        document.addEventListener("offline", offOnline, true); // если пользователь не подключен к Интернет, то сообщаем об этом
        function offOnline() {
            alert("Для нормальной работы приложения необходим доступ в сеть Интернет", "Нет доступа к сети Интернет");
        };
        
        

/* КОНЕЦ - ГЛАБАЛЬНЫЕ ПЕРЕМЕННЫЕ */


/* ПРОВЕРКА ЗАРЕГИСТРИРОВАН ЛИ ПОЛЬЗОВАТЕЛЬ */
    function avtorizaciya (){
	
        if (value != "" && value != "undefined" && value != null) {             // если в localStorage есть данные, то.. 
                str_poisk_param_active ();                                      // запускаем страницу фильтра
                avtorizaciya_active = true;
                $(".wr_menu").css({"display":"block"});                          //  скрываем меню
                $(".content_str_reg").css({"width":"92%", "margin-left":"8%"});
        }
        else {                                                                   // Если данных нет т.е. пользователь не зарегистрированный то.. 
                $(".wr_menu").css({"display":"none"});                          //  скрываем меню
                $(".content_str_reg").css({"width":"100%", "margin-left":"0"}); // и немного расширяем страницу контента решистариции 
                avtorizaciya_active = false;

        }
        
    }
    avtorizaciya ();
/* КОНЕЦ - ПРОВЕРКА ЗАРЕГИСТРИРОВАН ЛИ ПОЛЬЗОВАТЕЛЬ */


/* ФУНКЦИЯ ЗАПРЕТА КЛИКА ПОСЛЕ СОВЕРШЕНИЯ MOVE */ 
        var move_cords = 0;                                 // Создаем переменну для координат движения и говорим ей сразу, что она больше 0
        function stop_click_if_move(){
            jQuery(document).on("touchstart", function(){
                move_cords = 0;
            });
            jQuery(document).on("touchmove", function(event){    // Отслеживаем во всем документе было ли движение пальцем
                var tmove = event.originalEvent;            // Переменна с орегинальным событием
                move_cords = tmove.changedTouches[0].pageX; // Передаем значение переменной если было движение
                if (move_cords > 0){                        // Тут же проверяем / если значение больше 0
                }    
            });
            if (move_cords > 0){                            // Проверяем вне функции оттслеживания движения / если перевенная действия включена т.е. движение было то..
                move_cords = 0;
                event.target.preventDefault();              // Прекрашаем выполнения функции т.е. отменяем то действие (touchend mousedown) которым была вызвана функция stop_click_if_move()
            }
            //alert(move_cords);
        }   
/* конец - ФУНКЦИЯ ЗАПРЕТА КЛИКА ПОСЛЕ СОВЕШЕНИЯ MOVE */
//
//
//
//
// --------------------------------------------- / конец - СТАРТОВЫЕ СЦЕНАРИИ + ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ / --------------------------------------------------- //

// --------------------------------------------- / ОБЩИЕ ФУНКЦИИ / --------------------------------------------------- // 
//
//
//
//
/* ФУНКЦИЯ - СКРИПТ ПРИ ВВОДИ В INPUT ДЕЛАЕМ ПЕРВУЮ БУКВУ ЗАКЛАВНОЙ */ 

$("input, textarea").keyup( function(){
        var all_input = $(this).val();
        if (all_input.length == 1) { 
                all_input = all_input.toUpperCase();
                $(this).val(all_input);
        };
});        
  
$(".reg_fio_wr input").keyup( function(){
        var x = $(this).val();

        if ( x[x.length - 2] == " ") {
                x = x.substring(0, x.length-1)+ x[x.length - 1].toUpperCase();
                $(this).val(x);
        };
});        

/* конец - ФУНКЦИЯ - СКРИПТ ПРИ ВВОДИ В INPUT ДЕЛАЕМ ПЕРВУЮ БУКВУ ЗАКЛАВНОЙ */ 

/* ФУНКЦИЯ - ПОКАЗЫВАЕТ КОНПКУ "НАВЕРХ" ПРИ ПРОКРУТКЕ */
        jQuery(document).on("scroll", function () { 
            var document_scroll = jQuery(document).scrollTop();                                          // Определяем высоту скролла
            setTimeout( function() {
                if(document_scroll > 50){ $(".but_up").css({"display":"block"}); }
                else{ $(".but_up").css({"display":"none"}); };
            }, 300);
        });
        $(".but_up").on("touchend", function(){ // Прокрутка при нажатии
            stop_click_if_move();
            jQuery(document).scrollTop(0);
        });
/* конец - ФУНКЦИЯ - ПОКАЗЫВАЕТ КОНПКУ "НАВЕРХ" ПРИ ПРОКРУТКЕ */

/* ФУНКЦИЯ - ПОКАЗЫВАЕТ ОКНО ЗАЛИВКА */
        function zalivka_active (){
                $("#zalivka_modal").css({"display":"inline-block"});                        // открываем заливку
                zalivka_on = true;
        };
/* конец - ФУНКЦИЯ - ПОКАЗЫВАЕТ ОКНО ЗАЛИВКА */


/* ФУНКЦИЯ - ЗАКРЫВАЕТ ВСЕ МОДАЛЬНЫЕ ОКНА */
        function close_all_modals (){
                if (zalivka_on === true){   // проверяет открыта ли заливка
                        $("#zalivka_modal").css({"display":"none"});                        // закрывает - Заливку
                        $(".all_modals").css({"display":"none"});                           // закрывает - Все модальные окна
                        zalivka_on = false;
                }
        };
/* конец - ФУНКЦИЯ ЗАКРЫВАЕТ ВСЕ МОДАЛЬНЫЕ ОКНА */
        

/* ФУНКЦИЯ - УДАЛЯЕМ ВСЕ INPUT ИЗ ОКОН ФИЛЬТРА */
        function remove_input_filtr_modals (){  
                $(".all_filtr_modals form *").remove();                                     // Удоляем построенный списоки из модальных окон фильтра
                metro_postroeno = false;                                                    // Сообщаем переменным что ранее построенные пункты выбора удалены      
                kitchen_postroeno = false;                                                  // Сообщаем переменным что ранее построенные пункты выбора удалены      
                osobennost_postroeno = false;                                               // Сообщаем переменным что ранее построенные пункты выбора удалены
                reg_banck_postroeno = false;                                                // Сообщаем переменным что ранее построенные пункты выбора удалены
        };
/* конец - ФУНКЦИЯ - УДОЛЯЕМ ВСЕ INPUT ИЗ ОКОН ФИЛЬТРА */


/* ФУНКЦИЯ - ВЫБОРА ПУНКТОВ ОСНОВНОГО МЕНЮ */
        function all_menu_item (){  
                close_all_modals ();
                jQuery(document).scrollTop(0);
                
                $(".all_banners").css({"display":"none"});                                  // Выключает ВСЕ БАНЕРЫ на гланой странице
                $(".all_contents").css({"display":"none"});                                 // выключает ВСЕ СТРАНИЦЫ

                remove_input_filtr_modals ();
                
                zalivka_on = false;
                content_str_reg_on = false;
                content_vse_restorani_on = false;
                content_zabronirovat_stol_on = false;
                content_str_filtr_on = false;
                content_pokazat_na_karte_on = false;
                content_izbrannoe_on = false;
                content_moi_broni_on = false;
                content_moi_dannie_on = false;
                content_str_restorana_on = false;
                
                $(".content_str_restorana").removeClass("content_str_restorana_full_open");    // удаляем класс на странице ресторана, чтобы он отображался с свернутом виде
                
                //zalivka_on, content_str_reg_on, content_vse_restorani_on, content_zabronirovat_stol_on, content_str_filtr_on, content_pokazat_na_karte_on, content_izbrannoe_on, content_moi_broni_on, content_moi_dannie_on, content_str_restorana_on = false;
        };
/* конец - ФУНКЦИЯ - ВЫБОРА ПУНКТОВ ОСНОВНОГО МЕНЮ */


/* ФУНКЦИЯ - ОТКРЫВАЕТ СТРАНИЦУ "ВСЕ РЕСТОРАНЫ" */
        //var scroll_str_vse_rest = 0;
	function str_vse_rest_active (){
                all_menu_item ();
                
                $(".banner_poisk_wr").css({"display":"block"});
                $(".banner_poisk_wr input").val("");
		$(".banner_poisk_wr input").addClass("pole_poisk_srt_vse_restorani");       // Добавляем баннеру новый класс, чтобы можно было пользоваться поиском
		$(".content_vse_restorani").css({"display":"block"});
                
                //jQuery(document).scrollTop(scroll_str_vse_rest);
                
               // alert(scroll_str_vse_rest);
                
                content_vse_restorani_on = true;
                mas_back_but[mas_back_but.length] = "content_vse_restorani_on";
        };
        /*$(".content_vse_restorani").scroll( function(){
            scroll_str_vse_rest = $(".content_vse_restorani").scrollTop();
        })*/
/* конец - ФУНКЦИЯ - ОТКРЫВАЕТ СТРАНИЦУ "ВСЕ РЕСТОРАНЫ" */


/* ФУНКЦИЯ - ОТКРЫВАЕТ СТРАНИЦУ БРОНИРОВАНИЯ */
        function str_reserv_active (full_of_empty) {
                all_menu_item();
                $(".content_zabronirovat_stol").css({"display":"block"});
				
                content_zabronirovat_stol_on = true;
                mas_back_but[mas_back_but.length] = "content_zabronirovat_stol_on";

                if (full_of_empty == "full"){
                        //$(".banner_forma_broni_full_wr input").val($(".active_restoran .restoran_name span").text()); // Добавляем название ресторана в верхний баннер
                        //$(".banner_forma_broni_full_wr").css({"display":"block"});
                        // Временно закоментировал баннер который появляется если переход к бронированию был через ресторан
                        $(".banner_forma_broni_empty_wr input").val($(".active_restoran .restoran_name span").text()); // Добавляем название ресторана в верхний баннер
                        $(".banner_forma_broni_empty_wr").css({"display":"block"});
                }
                if (full_of_empty == "empty"){
                        $(".banner_forma_broni_empty_wr").css({"display":"block"});
                }
        };
/* конец - ФУНКЦИЯ - ОТКРЫВАЕТ СТРАНИЦУ БРОНИРОВАНИЯ */


/* ФУНКЦИЯ - ОТКРЫВАЕТ СТРАНИЦУ ПОИСКА / ФИЛЬТР */
        function str_poisk_param_active (){
                //stop_click_if_move();
                all_menu_item();
                
                $(".banner_str_filtr").css({"display":"block"});
                $(".content_filtr").css({"display":"block"});
                
                content_str_filtr_on = true;
                mas_back_but[mas_back_but.length] = "content_str_filtr_on";
        }
/* конец - ФУНКЦИЯ - ОТКРЫВАЕТ СТРАНИЦУ ПОИСКА / ФИЛЬТР  */


/* ФУНКЦИЯ - ОТСТРАИВАЕТ В DOM СПИСОК РЕСТОРАНОВ */
        function new_restron (id, div_name){ //создаем новый ресторан
		
			var map_cords = x.getElementsByTagName('MAP_CORDS')[id-1].childNodes[0].nodeValue;     // берем кординаты ресторана
			var r_rating = x.getElementsByTagName('R_RATING')[id-1].childNodes[0].nodeValue;       // берем тип заведения
			var r_name =  x.getElementsByTagName('R_NAME')[id-1].childNodes[0].nodeValue;          // берем название
			var r_metro = x.getElementsByTagName('R_MERTO_MAIN')[id-1].childNodes[0].nodeValue;    // берем метро
			var r_check = x.getElementsByTagName('R_CHECK')[id-1].childNodes[0].nodeValue;         //берем средний счет
			var r_osob = x.getElementsByTagName('R_OSOBENNOSTI')[id-1].childNodes[0].nodeValue;    //берем особенности
			var r_kitch = x.getElementsByTagName('KITCHEN')[id-1].childNodes[0].nodeValue;          //берем тип кухни
			
        /* Отслеживаем рейтинг и присваем классы */
            var value_rating;                           // Создаем переменую в которую будем заносить новый класс
            switch (r_rating){                          // Проверяем значение переменной r_rating которая соответсвует значинию из XML
                    case "0":                           // Если значение = 1, то..
                        value_rating = "rating_0";      // Присваеваем переменной нужное значение для последующей отработки в css
                    break
                    case "1": value_rating = "rating_1"; break
                    case "2": value_rating = "rating_2"; break
                    case "3": value_rating = "rating_3"; break
                    case "4": value_rating = "rating_4"; break
                    case "5": value_rating = "rating_5"; break                
            }
        /* Отслеживаем рейтинг и присваем классы */

            var dom_restoran = $('\n\
                    <div class="restoran_wr">\n\
                            <div class="restoran_block all_margin_center">\n\
                                    <div class="restoran_content">\n\
                                            <div class="all_restoran_id">'
                                                    +id+
                                            '</div>\n\
                                            <div class="all_restoran_map_cords">'
                                                    +map_cords+
                                            '</div>\n\
                                            <div class="restoran_name css_font_size_12 all_restoran_info">\n\
                                                    <span class="css_font_size_16">'+r_name+'</span>\n\
                                            </div>\n\
                                            <div class="all_restoran_rating all_restoran_info '+value_rating+' "></div>\n\
                                            <div class="restoran_metro css_font_size_12 all_restoran_info">\n\
                                                    Метро: <span class="css_font_size_14">'+r_metro+'</span>\n\
                                            </div>\n\
                                            <div class="restoran_chek css_font_size_12 all_restoran_info">\n\
                                                    Средний чек: <span class="css_font_size_14">'+r_check+' руб.</span>\n\
                                            </div>\n\
                                            <div class="restoran_osobennosti css_font_size_12 all_restoran_info" style="display:none">\n\
                                                    '+r_osob+'\n\
                                            </div>\n\
                                            <div class="restoran_kitch css_font_size_12 all_restoran_info" style="display:none">\n\
                                                    '+r_kitch+'\n\
                                            </div>\n\
                                    </div>\n\
                            </div>\n\
                            <div class="all_info_moi_broni delete_line_moi_broni" style="display:none"></div>\n\
                    </div>\n\
            ');
            dom_restoran.appendTo( "."+div_name ); // помещаем результат в нужное место
            new_fonts();
        };
/* конец - ФУНКЦИЯ - ОТСТРАИВАЕТ В DOM СПИСОК РЕСТОРАНОВ */


/* ФУНКЦИЯ -  */
        function all_resto(){
        /* ВЫВОД РЕСТОРАНОВ */
                $(".restoran_wr").remove(); // удаляем вре рестораны, которые на текущий момент отображены
                
		var res = x.getElementsByTagName('RESTORAN');   // создаем массив всех RESTORAN
		for (var i=0;i<res.length;i++){                 // обрабатываем каждый RESTORAN по порядку
			var r_id =  x.getElementsByTagName('R_ID')[i].childNodes[0].nodeValue;              // берем id               
			new_restron(r_id, "content_vse_restorani");                   //вызываем функцию помещающую новый ресторан в DOM
		}
        /* ВЫВОД РЕСТОРАНОВ */

        /* ПОИСК ПО ВСЕМ РЕСТОРАНАМ */
		$(".pole_poisk_srt_vse_restorani").keyup(function(){ // Отслеживает нажатие кнопки на клавиатуре
			var pole_poiska = $(".pole_poisk_srt_vse_restorani").val(); // берем напечатанный поисковый запрос 
			//if (pole_poiska.length > 3){
				$(".restoran_wr").remove(); // удаляем вре рестораны, которые на екущий момент отображены

				for (var i = 0; i < x.getElementsByTagName('R_NAME').length; i++){ //перебираем элементы из XML но названию заведения
					var resto_name = x.getElementsByTagName('R_NAME')[i].childNodes[0].nodeValue; // берем название ресторана c XML исравниваем его результат в введеным запросом в поле поиска
					if ( resto_name.toLowerCase().indexOf(pole_poiska.toLowerCase()) < 0 ){ // если запросы не савподают, то идем по циклу дальше / также приводим вводимые значения и значения и XML к нижнему регистру
					}
					else { // если такой ресторан есть, то его отрисовываем
						var r_id =  x.getElementsByTagName('R_ID')[i].childNodes[0].nodeValue;              // берем id               
						new_restron(r_id, "content_vse_restorani");                   //вызываем функцию помещающую новый ресторан в DOM
					}
				}
			//}
		});
        /* КОНЕЦ - ПОИСК ПО ВСЕМ РЕСТОРАНАМ */
 	};
	
/* конец - ФУНКЦИЯ -  */


/* ФУНКЦИЯ - РАСКРЫТИЯ БЛОКА ПОД РЕСТОРАНОМ */
        function click_na_restorane (activ_restoran){                                // Передаем функции парамерт с клика и называем его activ_restoran 
                $(".restoran_wr").css({"margin-bottom":"2%"});                      //  Перед выводом нового блока убираем отступ снизу
                $(".restoran_wr").removeClass("active_restoran");                   //  Удаляем класс, который создается при клике на ресторан
                $(".restoran_block").css({"background":"white"});
                $(".all_restoran_block_buts").remove();                             //  Перед выводом нового блока с кнопками удаляем все ранее открытые
                var all_restoran_block_buts = $('   <div class="all_restoran_block_buts">\n\
                                                        <div class="but_podrobnee_vse_rest_wr all_but_big_wr">\n\
                                                            <div class="all_but_medium_wr all_margin_center">\n\
                                                                <input class="css_font_size_12 all_margin_center" type="text" value="ПОДРОБНЕЕ" readonly />\n\
                                                            </div>\n\
                                                        </div>\n\
                                                        <div class="but_map_vse_rest_wr all_but_big_wr">\n\
                                                            <div class="all_but_medium_wr all_margin_center">\n\
                                                                <input class="css_font_size_12 all_margin_center" type="text" value="НА КАРТЕ" readonly />\n\
                                                            </div>\n\
                                                        </div>\n\
                                                        <div class="but_bron_vse_rest_wr all_but_big_wr">\n\
                                                            <div class="all_but_medium_wr all_margin_center">\n\
                                                                <input class="css_font_size_12 all_margin_center" type="text" value="ЗАБРОНИРОВАТЬ СТОЛИК" readonly />\n\
                                                            </div>\n\
                                                        </div>\n\
                                                ');
                all_restoran_block_buts.appendTo(activ_restoran);                          //  Выводм блок с кнопками ресторана на нажатом ресторане
                activ_restoran.css({"margin-bottom":"26%"});                               //  Добавляем отступ снизу чтобы блок с кнопками не наезжал на следующий ресторан
                activ_restoran.addClass("active_restoran");                                //  Добавляем новый класс активному ресторану
                $(".restoran_block", activ_restoran).css({"background":"#FFE8E1"});         //  Нажатый ресторан меняет цвет фона
                //scroll_str_vse_rest = $(".active_restoran").scrollTop();                    // Запоминаем прокрутка на которой находится активный ресторан
                new_fonts();
        };
/* конец - ФУНКЦИЯ - РАСКРЫТИЯ БЛОКА ПОД РЕСТОРАНОМ */


/* ФУНКЦИЯ - ВЫВОДИМ КОНКРЕТНЫЙ РЕСТОРАН */
	function resto_page(num){
		$(".all_contents").css({"display":"none"});                     // выключает ВСЕ СТРАНИЦЫ
		$(".all_banners").css({"display":"none"});                      // Выключает основной поисковый баннер

		$(".banner_buts_str_restorana_wr").css({"display":"block"});    // Выключает баннер с кнопками для страници ресторана
		$(".content_str_restorana").css({"display":"block"});           // включаем страницу ресторана

                content_str_restorana_on = true;
                mas_back_but[mas_back_but.length] = "content_str_restorana_on";

		var dom_slider = $('<div id="sliderA" class="slider"></div>');  // Создаем переменную где позднее будет инициализироваться слайдер
		dom_slider.appendTo( ".block_foto_restorana" );                 // После удалении тега вновь его добавляем, чтобы сладер мог заного проинициализиоваться
		num = num - 1;
		var r_id = x.getElementsByTagName('R_ID')[num].childNodes[0].nodeValue; // берем ID
		var r_name =  x.getElementsByTagName('R_NAME')[num].childNodes[0].nodeValue; // берем название
		var r_metro = x.getElementsByTagName('R_MERTO_MAIN')[num].childNodes[0].nodeValue; // берем метро
		var r_address = x.getElementsByTagName('R_ADDRESS')[num].childNodes[0].nodeValue;
		var r_time = x.getElementsByTagName('R_TIME')[num].childNodes[0].nodeValue;
		var r_check = x.getElementsByTagName('R_CHECK')[num].childNodes[0].nodeValue;
		var r_discount = x.getElementsByTagName('R_DISCOUNT')[num].childNodes[0].nodeValue;
		var r_kitch = x.getElementsByTagName('KITCHEN')[num].childNodes[0].nodeValue;
		var r_coord = x.getElementsByTagName('MAP_CORDS')[num].childNodes[0].nodeValue;
		var r_opisanie = x.getElementsByTagName('R_ABOUT')[num].childNodes[0].nodeValue;
		var r_osobennosti = x.getElementsByTagName('R_OSOBENNOSTI')[num].childNodes[0].nodeValue;
		$(".about_resto_feature *").remove();
		r_osobennosti = r_osobennosti.split(",");
                
                /*особенности*/
                function feature(num_feature){
                        switch (num_feature){
                                case "1":
                                var new_feature = $("<div class='wr_img'><img class='all_resto_feature_name_position css_font_size_12' src='img/feature/wi_fi.png' /></div><div class='text_feature'>wi-fi</div>");
                                new_feature.appendTo(".about_resto_feature");  break  
                                
                                case "2":
                                var new_feature = $("<div class='wr_img'><img class='all_resto_feature_name_position css_font_size_12' src='img/feature/parking.png' /></div><div class='text_feature'>паркинг</div>");
                                new_feature.appendTo(".about_resto_feature");  break  

                                case "3":
                                var new_feature = $("<div class='wr_img'><img class='all_resto_feature_name_position css_font_size_12' src='img/feature/smoke.png' /></div><div class='text_feature'>зона для курения</div>");
                                new_feature.appendTo(".about_resto_feature");  break  
                                
                                case "4":
                                var new_feature = $("<div class='wr_img'><img class='all_resto_feature_name_position css_font_size_12' src='img/feature/Breakfast.png' /></div><div class='text_feature'>завтраки</div>");
                                new_feature.appendTo(".about_resto_feature");  break  

                                case "5":
                                var new_feature = $("<div class='wr_img'><img class='all_resto_feature_name_position css_font_size_12' src='img/feature/business_lunch.png' /></div><div class='text_feature'>бизнес-ланч</div>");
                                new_feature.appendTo(".about_resto_feature");  break  

                                case "6":
                                var new_feature = $("<div class='wr_img'><img class='all_resto_feature_name_position css_font_size_12' src='img/feature/music.png' /></div><div class='text_feature'>живая музыка</div>");
                                new_feature.appendTo(".about_resto_feature");  break  
                                
                                case "7":
                                var new_feature = $("<div class='wr_img'><img class='all_resto_feature_name_position css_font_size_12' src='img/feature/eda_na_vinos.png' /></div><div class='text_feature'>еда на вынос</div>");
                                new_feature.appendTo(".about_resto_feature");  break  
                                
                                case "8":
                                var new_feature = $("<div class='wr_img'><img class='all_resto_feature_name_position css_font_size_12' src='img/feature/dj.png' /></div><div class='text_feature'>dj</div>");
                                new_feature.appendTo(".about_resto_feature");  break  
                                
                                case "9":
                                var new_feature = $("<div class='wr_img'><img class='all_resto_feature_name_position css_font_size_12' src='img/feature/karaoki.png' /></div><div class='text_feature'>караоки</div>");
                                new_feature.appendTo(".about_resto_feature");  break  

                                case "10":
                                var new_feature = $("<div class='wr_img'><img class='all_resto_feature_name_position css_font_size_12' src='img/feature/kalyan.png' /></div><div class='text_feature'>кальян</div>");
                                new_feature.appendTo(".about_resto_feature");  break  

                                case "11":
                                var new_feature = $("<div class='wr_img'><img class='all_resto_feature_name_position css_font_size_12' src='img/feature/TV.png' /></div><div class='text_feature'>TV</div>");
                                new_feature.appendTo(".about_resto_feature");  break  

                                case "12":
                                var new_feature = $("<div class='wr_img'><img class='all_resto_feature_name_position css_font_size_12' src='img/feature/disco.png' /></div><div class='text_feature'>дискотека</div>");
                                new_feature.appendTo(".about_resto_feature");  break  
                                
                                case "13":
                                var new_feature = $("<div class='wr_img'><img class='all_resto_feature_name_position css_font_size_12' src='img/feature/veranda.png' /></div><div class='text_feature'>веранда</div>");
                                new_feature.appendTo(".about_resto_feature");  break  
                                
                                case "14":
                                var new_feature = $("<div class='wr_img'><img class='all_resto_feature_name_position css_font_size_12' src='img/feature/activ.png' /></div><div class='text_feature'>активный отдых</div>");
                                new_feature.appendTo(".about_resto_feature");  break  
                                
                                case "15":
                                var new_feature = $("<div class='wr_img'><img class='all_resto_feature_name_position css_font_size_12' src='img/feature/vip.png' /></div><div class='text_feature'>VIP-зал</div>");
                                new_feature.appendTo(".about_resto_feature");  break  
                                
                                case "16":
                                var new_feature = $("<div class='wr_img'><img class='all_resto_feature_name_position css_font_size_12' src='img/feature/alco.png' /></div><div class='text_feature'>алкоголь</div>");
                                new_feature.appendTo(".about_resto_feature");  break  
                                
                                case "17":
                                var new_feature = $("<div class='wr_img'><img class='all_resto_feature_name_position css_font_size_12' src='img/feature/foreign_language.png' /></div><div class='text_feature'>для экспатов</div>");
                                new_feature.appendTo(".about_resto_feature");  break  
                                
                                case "18":
                                var new_feature = $("<div class='wr_img'><img class='all_resto_feature_name_position css_font_size_12' src='img/feature/tanspol.png' /></div><div class='text_feature'>танцпол</div>");
                                new_feature.appendTo(".about_resto_feature");  break  
                                
                                case "19":
                                var new_feature = $("<div class='wr_img'><img class='all_resto_feature_name_position css_font_size_12' src='img/feature/children_menu.png' /></div><div class='text_feature'>детское меню</div>");
                                new_feature.appendTo(".about_resto_feature");  break  
                                
                                case "20":
                                var new_feature = $("<div class='wr_img'><img class='all_resto_feature_name_position css_font_size_12' src='img/feature/baby-stroller.png' /></div><div class='text_feature'>детская комната</div>");
                                new_feature.appendTo(".about_resto_feature");  break  
                                
                                case "21":
                                var new_feature = $("<div class='wr_img'><img class='all_resto_feature_name_position css_font_size_12' src='img/feature/credit_card.png' /></div><div class='text_feature'>кредитные карты</div>");
                                new_feature.appendTo(".about_resto_feature");  break  
                                
                                case "22":
                                var new_feature = $("<div class='wr_img'><img class='all_resto_feature_name_position css_font_size_12' src='img/feature/disco.png' /></div><div class='text_feature'>дискотека</div>");
                                new_feature.appendTo(".about_resto_feature");  break  
                                
                                case "23":
                                var new_feature = $("<div class='wr_img'><img class='all_resto_feature_name_position css_font_size_12' src='img/feature/country.png' /></div><div class='text_feature'>загородный</div>");
                                new_feature.appendTo(".about_resto_feature");  break  

                                case "24":
                                var new_feature = $("<div class='wr_img'><img class='all_resto_feature_name_position css_font_size_12' src='img/feature/panorama.png' /></div><div class='text_feature'>3D панорама</div>");
                                new_feature.appendTo(".about_resto_feature");  break  
                                
                                case "25":
                                var new_feature = $("<div class='wr_img'><img class='all_resto_feature_name_position css_font_size_12' src='img/feature/holiday.png' /></div><div class='text_feature'>организация праздников</div>");
                                new_feature.appendTo(".about_resto_feature");  break  
                                
                                case "26":
                                var new_feature = $("<div class='wr_img'><img class='all_resto_feature_name_position css_font_size_12' src='img/feature/bilyard.png' /></div><div class='text_feature'>бильярд</div>");
                                new_feature.appendTo(".about_resto_feature");  break  

                                case "27":
                                var new_feature = $("<div class='wr_img'><img class='all_resto_feature_name_position css_font_size_12' src='img/feature/darts.png' /></div><div class='text_feature'>дартс</div>");
                                new_feature.appendTo(".about_resto_feature");  break  
 
                                case "28":
                                var new_feature = $("<div class='wr_img'><img class='all_resto_feature_name_position css_font_size_12' src='img/feature/games.png' /></div><div class='text_feature'>настольные игры</div>");
                                new_feature.appendTo(".about_resto_feature");  break  
                                
                                case "29":
                                var new_feature = $("<div class='wr_img'><img class='all_resto_feature_name_position css_font_size_12' src='img/feature/actor.png' /></div><div class='text_feature'>шоу-программа</div>");
                                new_feature.appendTo(".about_resto_feature");  break  
                                
                                case "30":
                                var new_feature = $("<div class='wr_img'><img class='all_resto_feature_name_position css_font_size_12' src='img/feature/go-go.png' /></div><div class='text_feature'>go-go</div>");
                                new_feature.appendTo(".about_resto_feature");  break  
                                
                                case "31":
                                var new_feature = $("<div class='wr_img'><img class='all_resto_feature_name_position css_font_size_12' src='img/feature/strip.png' /></div><div class='text_feature'>стриптиз</div>");
                                new_feature.appendTo(".about_resto_feature");  break  
                                
                                case "32":
                                var new_feature = $("<div class='wr_img'><img class='all_resto_feature_name_position css_font_size_12' src='img/feature/movie.png' /></div><div class='text_feature'>кинопоказы</div>");
                                new_feature.appendTo(".about_resto_feature");  break  
                                
                                case "33":
                                var new_feature = $("<div class='wr_img'><img class='all_resto_feature_name_position css_font_size_12' src='img/feature/stock_anchor.png' /></div><div class='text_feature'>на корабле</div>");
                                new_feature.appendTo(".about_resto_feature");  break  
                                
                                case "34":
                                var new_feature = $("<div class='wr_img'><img class='all_resto_feature_name_position css_font_size_12' src='img/feature/na_krishe.png' /></div><div class='text_feature'>на крыше</div>");
                                new_feature.appendTo(".about_resto_feature");  break  
                                
                                case "35":
                                var new_feature = $("<div class='wr_img'><img class='all_resto_feature_name_position css_font_size_12' src='img/feature/to_woter.png' /></div><div class='text_feature'>рядом с водой</div>");
                                new_feature.appendTo(".about_resto_feature");  break  
                                
                                case "36":
                                var new_feature = $("<div class='wr_img'><img class='all_resto_feature_name_position css_font_size_12' src='img/feature/terassa.png' /></div><div class='text_feature'>терраса</div>");
                                new_feature.appendTo(".about_resto_feature");  break  

                                case "37":
                                var new_feature = $("<div class='wr_img'><img class='all_resto_feature_name_position css_font_size_12' src='img/feature/met.png' /></div><div class='text_feature'>мясное меню</div>");
                                new_feature.appendTo(".about_resto_feature");  break  
                                
                                case "38":
                                var new_feature = $("<div class='wr_img'><img class='all_resto_feature_name_position css_font_size_12' src='img/feature/fish.png' /></div><div class='text_feature'>рыбное меню</div>");
                                new_feature.appendTo(".about_resto_feature");  break  
                                
                                case "39":
                                var new_feature = $("<div class='wr_img'><img class='all_resto_feature_name_position css_font_size_12' src='img/feature/beare.png' /></div><div class='text_feature'>пиво</div>");
                                new_feature.appendTo(".about_resto_feature");  break  
                                
                                case "40":
                                var new_feature = $("<div class='wr_img'><img class='all_resto_feature_name_position css_font_size_12' src='img/feature/actor.png' /></div><div class='text_feature'>есть сцена</div>");
                                new_feature.appendTo(".about_resto_feature");  break  
                        }
                }
                for (var i = 0; i < r_osobennosti.length; i++){
                        feature(r_osobennosti[i]);
                }
                /* конец - особенности */

               /* позиции меню */
                var menu_salad_1 = x.getElementsByTagName('MENU_SALAD_1')[num].childNodes[0].nodeValue;
                var menu_salad_1_cost = x.getElementsByTagName('MENU_SALAD_1_COST')[num].childNodes[0].nodeValue;
                var menu_salad_2 = x.getElementsByTagName('MENU_SALAD_2')[num].childNodes[0].nodeValue;
                var menu_salad_2_cost = x.getElementsByTagName('MENU_SALAD_2_COST')[num].childNodes[0].nodeValue;
                var menu_soup_1 = x.getElementsByTagName('MENU_SOUP_1')[num].childNodes[0].nodeValue;
                var menu_soup_1_cost = x.getElementsByTagName('MENU_SOUP_1_COST')[num].childNodes[0].nodeValue;
                var menu_soup_2 = x.getElementsByTagName('MENU_SOUP_2')[num].childNodes[0].nodeValue;
                var menu_soup_2_cost = x.getElementsByTagName('MENU_SOUP_2_COST')[num].childNodes[0].nodeValue;
                var menu_main_dishes_1 = x.getElementsByTagName('MENU_MAIN_DISHES_1')[num].childNodes[0].nodeValue;
                var menu_main_dishes_1_cost = x.getElementsByTagName('MENU_MAIN_DISHES_1_COST')[num].childNodes[0].nodeValue;
                var menu_main_dishes_2 = x.getElementsByTagName('MENU_MAIN_DISHES_2')[num].childNodes[0].nodeValue;
                var menu_main_dishes_2_cost = x.getElementsByTagName('MENU_MAIN_DISHES_2_COST')[num].childNodes[0].nodeValue;
                var menu_drinks_1 = x.getElementsByTagName('MENU_DRINKS_1')[num].childNodes[0].nodeValue;
                var menu_drinks_1_cost = x.getElementsByTagName('MENU_DRINKS_1_COST')[num].childNodes[0].nodeValue;
                var menu_drinks_2 = x.getElementsByTagName('MENU_DRINKS_2')[num].childNodes[0].nodeValue;
                var menu_drinks_2_cost = x.getElementsByTagName('MENU_DRINKS_2_COST')[num].childNodes[0].nodeValue;
                /* конец - позиции меню */

		$(".restoran_page_map_cords").text(r_coord);
		$(".restoran_page_id").text(r_id);
		$(".about_resto_name").text(r_name); // подставляем текст в БАННЕР на странице ресторана
		$(".about_resto_metro .all_resto_info_block_text").text(r_metro); // подставляем текст в МЕТРО ресторана на странице ресторана
		$(".about_resto_adres .all_resto_info_block_text").text(r_address); // подставляем текст в АДРЕС ресторана на странице ресторана
		$(".about_resto_vremya .all_resto_info_block_text").text(r_time);
		$(".about_resto_chek .all_resto_info_block_text").text(r_check + " руб.");
		$(".about_resto_sale .all_resto_info_block_text").text(r_discount + "%" + " - скидка при оплате картой");
                $(".about_resto_kitchen .all_resto_info_block_text").text(r_kitch);
                $(".about_resto_opisanie").text(r_opisanie);
                /* позиции меню */
                $(".menu_salad_1").text(menu_salad_1);
                $(".menu_salad_1_cost").text(menu_salad_1_cost + " руб.");
                $(".menu_salad_2").text(menu_salad_2);
                $(".menu_salad_2_cost").text(menu_salad_2_cost + " руб.");
                $(".menu_soup_1").text(menu_soup_1);
                $(".menu_soup_1_cost").text(menu_soup_1_cost + " руб.");
                $(".menu_soup_2").text(menu_soup_2);
                $(".menu_soup_2_cost").text(menu_soup_2_cost + " руб.");
                $(".menu_main_dishes_1").text(menu_main_dishes_1);
                $(".menu_main_dishes_1_cost").text(menu_main_dishes_1_cost + " руб.");
                $(".menu_main_dishes_2").text(menu_main_dishes_2);
                $(".menu_main_dishes_2_cost").text(menu_main_dishes_2_cost + " руб.");
                $(".menu_drinks_1").text(menu_drinks_1);
                $(".menu_drinks_1_cost").text(menu_drinks_1_cost + " руб.");
                $(".menu_drinks_2").text(menu_drinks_2);
                $(".menu_drinks_2_cost").text(menu_drinks_2_cost + " руб.");
                /* конец - позиции меню */


		/* Вставляет фотографии ресторана */
		var img_1 = x.getElementsByTagName('IMG_1')[num].childNodes[0].nodeValue;   /* Создаем переменную и запихиваем в нее содержимое тега IMG из XML файла */
		var dom_foto_restorana_1 = $('<img class="foto_restorana_1" src="" />');    /* Создаем еще переменную и запихиваем в нее новый тег для HTML */
		if (img_1 != 0){                                                           /* Если в XML теге стоит не стоит 0, то..  */
			dom_foto_restorana_1.appendTo( ".slider" );                             /* Добавляем наш HTML тег в див с классом "slider" */
			$(".foto_restorana_1").attr('src', 'http://test_to_app.zakazstolov24.ru/img_restorans/' + img_1);                              /* Меняем атребут на путь к картинке из XML тега */
		};
		var img_2 = x.getElementsByTagName('IMG_2')[num].childNodes[0].nodeValue;
		var dom_foto_restorana_2 = $('<img class="foto_restorana_2" src="" />');
		if (img_2 != 0){
			dom_foto_restorana_2.appendTo( ".slider" );
			$(".foto_restorana_2").attr('src', 'http://test_to_app.zakazstolov24.ru/img_restorans/' + img_2);
		};
		var img_3 = x.getElementsByTagName('IMG_3')[num].childNodes[0].nodeValue;
		var dom_foto_restorana_3 = $('<img class="foto_restorana_3" src="" />');
		if (img_3 != 0){
			dom_foto_restorana_3.appendTo( ".slider" );
			$(".foto_restorana_3").attr('src', 'http://test_to_app.zakazstolov24.ru/img_restorans/' + img_3);
		};
		var img_4 = x.getElementsByTagName('IMG_4')[num].childNodes[0].nodeValue;
		var dom_foto_restorana_4 = $('<img class="foto_restorana_4" src="" />');
		if (img_4 != 0){
			dom_foto_restorana_4.appendTo( ".slider" );
			$(".foto_restorana_4").attr('src', 'http://test_to_app.zakazstolov24.ru/img_restorans/' + img_4);
		};
		var img_5 = x.getElementsByTagName('IMG_5')[num].childNodes[0].nodeValue;
		var dom_foto_restorana_5 = $('<img class="foto_restorana_5" src="" />');
		if (img_5 != 0){
			dom_foto_restorana_5.appendTo( ".slider" );
			$(".foto_restorana_5").attr('src', 'http://test_to_app.zakazstolov24.ru/img_restorans/' + img_5);
		};
		var img_6 = x.getElementsByTagName('IMG_6')[num].childNodes[0].nodeValue;
		var dom_foto_restorana_6 = $('<img class="foto_restorana_6" src="" />');
		if (img_6 != 0){
			dom_foto_restorana_6.appendTo( ".slider" );
			$(".foto_restorana_6").attr('src', 'http://test_to_app.zakazstolov24.ru/img_restorans/' + img_6);
		};
		/* Конец - Вставляет фотографии ресторана */ 
		/* Инициализируем слайдер*/
		var slider_na_srt_rest_zagrujen = false;
		if (slider_na_srt_rest_zagrujen === false){ /* проверяем запущен ли слайдер */
			$(function () {
				$("#sliderA").excoloSlider(); // инициализируем слайдер
				//slider_na_srt_rest_zagrujen = true;
			});
		}
		/* Конец- инициализируем слайдер */
                /* если в базе до данной категории меню нет информации, то скрыаем пустой блок */
                $(".about_resto_menu *").css({"display":"inline-block"});
                $(".about_resto_menu .menu_zagolovok_bluda").css({"display":"block"});
                if(menu_salad_1 == 0 || menu_salad_2 == 0){
                    $(".menu_zagolovok_salad, .menu_salad_1, .menu_salad_2, .menu_salad_1_cost, .menu_salad_2_cost").css({"display":"none"});
                }
                if(menu_soup_1 == 0 || menu_soup_2 == 0){
                    $(".menu_zagolovok_soup, .menu_soup_1, .menu_soup_2, .menu_soup_1_cost, .menu_soup_2_cost").css({"display":"none"});
                }
                if(menu_main_dishes_1 == 0 || menu_main_dishes_2 == 0){
                    $(".menu_zagolovok_dishes, .menu_main_dishes_1, .menu_main_dishes_2, .menu_main_dishes_1_cost, .menu_main_dishes_2_cost").css({"display":"none"});
                }
                if(menu_drinks_1 == 0 || menu_drinks_2 == 0){
                    $(".menu_zagolovok_drinks, .menu_drinks_1, .menu_drinks_2, .menu_drinks_1_cost, .menu_drinks_2_cost").css({"display":"none"});
                }
                /* конец - если в базе до данной категории меню нет информации, то скрыаем пустой блок */
	};
/* конец - ФУНКЦИЯ - ВЫВОДИМ КОНКРЕТНЫЙ РЕСТОРАН */
 
// ?? 
/* ФУНКЦИЯ - ОТКРЫТИЕ КОНКРЕТНОГО РЕСТОРАНА / ПОДРОБНЕЕ */
        function click_na_podrobnee (){
                $(".slider").remove();                                          // Удаляем в HTML тег со слайдером / т.е. иначе при каждом нажатии на пункте меню "все рестораны" слайдет будет дублироваться
                resto_page($(".active_restoran .all_restoran_id").text());
                $(".str_rest_info_block_2").removeClass("str_rest_info_block_2_active");
        };
/* конец - ФУНКЦИЯ - ОТКРЫТИЕ КОНКРЕТНОГО РЕСТОРАНА / ПОДРОБНЕЕ */


/* ФУНКЦИЯ - ВЫВОДИТ РАСПОЛОЖЕНИЕ РЕСТОРАНА НА КАРТЕ */
        function resto_in_map (name){
                all_menu_item();
                $(".content_pokazat_na_karte").css({"display":"block"});
                
                activ_resto_cords = name.split(',');
                card_page (activ_resto_cords, false); //открываем карту и центрируем на нужном ресторане
        }
/* конец - ФУНКЦИЯ - ВЫВОДИТ РАСПОЛОЖЕНИЕ РЕСТОРАНА НА КАРТЕ */


/* ФУНКЦИЯ - ОТКРЫВАЕТ КАРТУ СО ВСЕМИ РЕСТОРАНАМИ */
	function card_page (position_rest, flag){
		$(".content_pokazat_na_karte").css({"display":"block"});
		content_pokazat_na_karte_on = true;
                mas_back_but[mas_back_but.length] = "content_pokazat_na_karte_on";
                
        /* ГЕОЛОКАЦИЯ подгружается по требованию (после нажатия на соответствующем пункте меню) */
                $.getScript("http://www.google.com/jsapi", function() { // вызываем скрипт с гугла при клике на меню
                    var map; // создаем новую переменную
                    google.load("maps", "3.9", {"callback": map, other_params: "sensor=true&language=ru"}); // загружаем карту с гугла, sensor - включает геолакацию, язык русский
                    var markers = [],
						myPlaces = [],
						infos = [];
					var my_position;					
					
					function map(){
                        var latlng = new google.maps.LatLng(55.754640, 37.619975); // переменная геоданных, центр москвы
          				var myOptions = {
								zoom: 15, // отрабатывает только когда нет геоданных пользователя
								center: latlng, // подсасывает геоданные с переменной
								zoomControl: true,
								zoomControlOptions: {
								style: google.maps.ZoomControlStyle.LARGE,
								position: google.maps.ControlPosition.RIGHT_CENTER
							},								
								panControl: false,
								mapTypeControl: false,
								scaleControl: false,
								streetViewControl: false,
								overviewMapControl: false, 
								mapTypeId: google.maps.MapTypeId.ROADMAP  // тип карты - обычный (спутник, схема и т.д.)
							
						}
                        map = new google.maps.Map(document.getElementById("map"), myOptions);
						var config = {
							   enableHighAccuracy: true,
							   timeout: 20000,
							   maximumAge: 18000000
							}
                        navigator.geolocation.getCurrentPosition(geo_success, geo_error, config);
                    }
                    function geo_error(error) {
                        alert('Для работы с картой необходимо включить функцию Местоположение (GPS) на Вашем устройстве.','Выключена функция GPS');
                    }
                    function geo_success(position) {
						if (flag){ //если нужно центрировать на текущем местоположении
							map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
							my_position = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
							map.setZoom(15);
						} else { // если нужно центрировать на ресторане
							map.setCenter(new google.maps.LatLng(position_rest[0], position_rest[1]));
							my_position = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
							map.setZoom(18);
							
						}
						
						var resto_coord = x.getElementsByTagName('MAP_CORDS'); //берем особенности
						
						var icon_rest = 'http://google-maps-icons.googlecode.com/files/restaurant.png';
						//Добавляем места в массив
						myPlaces.push(new Place('Вы здесь', position.coords.latitude, position.coords.longitude, ''));

							for (var i=0; i < resto_coord.length; i++){ 
								var name = x.getElementsByTagName('R_NAME')[i].childNodes[0].nodeValue;
								var coord = x.getElementsByTagName('MAP_CORDS')[i].childNodes[0].nodeValue;
								coord = coord.split(',');
								var bill = x.getElementsByTagName('R_CHECK')[i].childNodes[0].nodeValue;
								var resto_index = x.getElementsByTagName('R_ID')[i].childNodes[0].nodeValue;
								myPlaces.push(new Place(name, coord[0], coord[1], 'Средний счет: '+bill, icon_rest, resto_index));
							}
                        //Теперь добавим маркеры для каждого места
                        for (var i = 0, n = myPlaces.length; i < n; i++) {
                            marker = new google.maps.Marker({
                                //расположение на карте
                                position: new google.maps.LatLng(myPlaces[i].latitude, myPlaces[i].longitude),
								resto_index: myPlaces[i].resto_index,
                                map: map,

                                //То что мы увидим при наведении мышкой на маркер
                                title: myPlaces[i].name,
                                            icon: myPlaces[i].icon
                            });
                                    //Добавим попап, который будет появляться при клике на маркер
                            var InfoWindow = new google.maps.InfoWindow({
                                content: '<div class="resto_index" style="display:none">'+myPlaces[i].resto_index+'</div><a href="#" class="tvoiClass"><h1 id="resto_page_name_click">' + myPlaces[i].name + '</h1></a><br/>' + myPlaces[i].description
                            });
                            //привязываем попап к маркеру на карте
                            makeInfoWindowEvent(map, InfoWindow, marker, i);
							infos.push(InfoWindow);
							markers.push(marker);
						}
						//Это класс для удобного манипулирования местами
						function Place(name, latitude, longitude, description, icon, resto_index){
								this.name = name;  // название
								this.latitude = latitude;  // широта
								this.longitude = longitude;  // долгота
								this.description = description;  // описание места
								this.icon = icon;
								this.resto_index = resto_index; // id ресторана
						}
						initialize(); // запускаем отрисовку кнопки
						
                    };
					
                    function makeInfoWindowEvent(map, infowindow, marker, index) {
                        //Привязываем событие КЛИК к маркеру
						
                        google.maps.event.addListener(marker, 'click', function() {
							for (var i = 0; i < infos.length; i++) {
								var mobj = infos[i];
								mobj.close();
							}
							infowindow.open(map, marker);
							map.setCenter(marker.getPosition());
							resto_index = marker.resto_index;
							
							$(".gm-style-iw").parent().on("click", ".tvoiClass", function(){
								if (marker.title != 'Вы здесь'){
									$(".slider").remove();                                          // Удаляем в HTML тег со слайдером / т.е. иначе при каждом нажатии на пункте меню "все рестораны" слайдет будет дублироваться
									resto_page(resto_index);
								};
							});			
						});
                    }
					function CenterControl(controlDiv, map) { //описание кнопки моя позиция на карте
						var goCenterUI = document.createElement('div');
                                                goCenterUI.className = "my_position";
                                                goCenterUI.addClass = ("my_position");
						controlDiv.appendChild(goCenterUI);
                                		google.maps.event.addDomListener(goCenterUI, 'click', function() {
							map.setCenter(my_position);
							map.setZoom(15);
						});
					};
					function initialize() {
						var centerControlDiv = document.createElement('div');
						var centerControl = new CenterControl(centerControlDiv, map);
						centerControlDiv.index = 1;
						map.controls[google.maps.ControlPosition.BOTTOM_RIGHT].push(centerControlDiv);
					}
					
             });
        /* конец - ГЕОЛОКАЦИЯ */
	}
/* конец - ФУНКЦИЯ - ОТКРЫВАЮЩЕЙ КАРТУ СО ВСЕМИ РЕСТОРАНАМИ*/


/* ФУНКЦИЯ - ОТКРЫВАЕТ СТРАНИЦУ "ИЗБРАННОЕ" */
        function str_izbrannoe_active (){
            all_menu_item();
            $(".content_izbrannoe").css({"display":"block"});
            $(".banner_str_izbrannoe").css({"display":"block"});
            
            content_izbrannoe_on = true;
            mas_back_but[mas_back_but.length] = "content_izbrannoe_on";
            $(".restoran_wr").remove();
            /* показывает все избранные рестораны */
            if (value != "" && value != "undefined" && value != null) { 
                    $.get('http://test_to_app.zakazstolov24.ru/favorites_page.php', {tel:value}, function(data) {
                            $('.all_favorites_id').text(data);
                    });
            }
            var all_favorites_id = new Array(0);
            all_favorites_id = favorites.split(',');
            //alert(all_favorites_id);
            for (var i = 0; i < all_favorites_id.length-1; i++){
                    //alert(all_favorites_id[i]);
                    if (all_favorites_id[i] != 0 ){
                            new_restron(all_favorites_id[i], "content_izbrannoe");
                    }
            }
            /* конец - показывает все избранные рестораны */
        };
/* конец - ФУНКЦИЯ - ОТКРЫВАЕТ СТРАНИЦУ "ИЗБРАННОЕ" */


/* ФУНКЦИЯ - ОТКРЫВАЕТ СТРАНИЦУ "МОИ БРОНИ" */
        function str_moi_broni_active (){
                all_menu_item();
                $(".banner_zagolovok_moi_broni").css({"display":"block"});
                $(".content_moi_broni").css({"display":"block"});
                
                content_moi_broni_on = true;
                mas_back_but[mas_back_but.length] = "content_moi_broni_on";

            /* отстраивает ранее совершенные брони */
                if (value != "" && value != "undefined" && value != null) { //если пользователь зарегистрирован, то выводим его брони
                    $.get('http://test_to_app.zakazstolov24.ru/booking_page.php', {tel:value}, function(data) {
                    $('.all_booking').html(data);
                    new_fonts();
                });
            }
            /* конец - отстраивает ранее совершенные брони */
                
        };
/* конец - ФУНКЦИЯ - ОТКРЫВАЕТ СТРАНИЦУ "МОИ БРОНИ" */


/* ФУНКЦИЯ - ОТКРЫВАЕТ СТРАНИЦУ "МОИ ДАННЫЕ" */
        function str_moi_dannie_active (){
                all_menu_item();
                
                $(".banner_str_moi_dannie").css({"display":"block"});
                $(".content_str_reg").css({"display":"block"});
				$(".content_str_reg").empty();
				$.get('http://test_to_app.zakazstolov24.ru/my_info.php', {tel:value}, function(data) {
                    $('.content_str_reg').html(data);
				});
                content_moi_dannie_on = true;
                mas_back_but[mas_back_but.length] = "content_moi_dannie_on";
            };
            $(".content_str_reg").on("touchend", ".reg_submit_wr_new input", function(){ // После клика на кнопку подтвердить, перезаписываем данные пользователя
                    new_card("change");
            });
            new_fonts();
/* конец - ФУНКЦИЯ - ОТКРЫВАЕТ СТРАНИЦУ "МОИ ДАННЫЕ" */


/* ФУНКЦИЯ - ОТКРЫВАЕТ МОДАЛЬНОЕ ОКНО "ВЫБОР ВРЕМЕНИ" */
        var modal_time_is_constraction = false;        // Отслеживает отстроино ли модальное окно выбора времени
        var modal_date_is_constraction = false;        // Отслеживает отстроино ли модальное окно выбора даты
        var modal_persons_is_constraction = false;     // Отслеживает отстроино ли модальное окно количество персон 
        var heiht_drums_elem = $(".all_drums_content div").height(); // Берем высоту элемента назначенную в CSS
        var first_drum_block_result = '01';                      // Итоговый результат выбора в окне часы
        var second_drum_block_result = '01';                    // Итоговый результат выбора в окне минуты
        //var date_year = new Date().getFullYear();
        var result_mask = 0;                                    // Переменная в которую будут заноситься маска по которой будет вносится данные в форму брони

        /* Создаем модальное окно динамически */
        function modal_chenge_param_active(){
            zalivka_active();
            $(".modal_param_change").css({"display":"block"});
            $(".all_drums").css({"height":heiht_drums_elem + "px"});                  // Назначаем высоту окна где будет прокрутка 
            $(".all_drums_content div").remove();                                       // Удоляем все ранее построенные элементы в нутри окна
            //$(".wr_block_result input").val("");
            $(".first_drum_block, .second_drum_block").animate({scrollTop: 1});
        };
        /* конец - Создаем модальное окно динамически */

        function time_append(){
            var hours = ["08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","00"];
            var minutes = ["00","05","10","15","20","25","30","35","40","45","50","55"];
            for (var i = 0; i < hours.length; i++){ // Перебераем, массив и выводим его в dom
                $('<div>' + hours[i] +'</div>').appendTo($(".first_drum_content"));             // Добавляем в блок
            };           
            for (var i = 0; i < minutes.length; i++){                                           // Перебераем, массив и выводим его в dom
                $('<div>' + minutes[i] +'</div>').appendTo($(".second_drum_content"));         // Добавляем в блок
            };
        };
        
        function date_append(){
            var days = ["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"];
            var month = ["Января","Февраля","Марта","Апреля","Мая","Июня","Июля","Августа","Сентября","Октября","Ноября","Декабря"];
            for (var i = 0; i < days.length; i++){ // Перебераем, массив и выводим его в dom
                $('<div>' + days[i] +'</div>').appendTo($(".first_drum_content"));              // Добавляем в блок
            };           
            for (var i = 0; i < month.length; i++){                                             // Перебераем, массив и выводим его в dom
                $('<div>' + month[i] +'</div>').appendTo($(".second_drum_content"));            // Добавляем в блок
            };
        }
        
        function person_append(){
            var person = ["1 персона","2 персоны","3 персоны","4 персоны","5 персон","6 персон","7 персон","8 персон","9 персон","10 персон","Банкет"];
            for (var i = 0; i < person.length; i++){ // Перебераем, массив и выводим его в dom
                $('<div>' + person[i] +'</div>').appendTo($(".first_drum_content"));             // Добавляем в блок
            };
        }
        
        /* отслеживаем прокрутку на барабанах */
    
        $(".first_drum_block").on("scroll", function () {                                               // Клик на кнопке показать результат
            var h_scroll = $(".first_drum_block").scrollTop();                                          // Определяем высоту скролла
            var medium_result = Math.round((h_scroll + heiht_drums_elem) / heiht_drums_elem);           // Переменная с результатом промежуточным (говорит какой элемент по счету выбран)
            var x = $(".first_drum_content *");                                                         // Берем все элементы 
            first_drum_block_result = x[medium_result-1].innerHTML;                                     // Берем все элементы которые отстроили, затем берем порядковый номер который дал medium_result
                 if(modal_time_is_constraction){
                    result_mask = first_drum_block_result + ':' + second_drum_block_result; // Заносим результат в строку результата 
                };
                if(modal_date_is_constraction){
                    result_mask = first_drum_block_result + ' ' + second_drum_block_result; // Заносим результат в строку результата 
                };
                if(modal_persons_is_constraction){
                    result_mask = first_drum_block_result; // Заносим результат в строку результата 
                };
            $("#wr_block_result_input").val(result_mask);                                               // Заносим результат в строку результата   
        });

        $(".second_drum_block").on("scroll", function () {                                               // Клик на кнопке показать результат
            
            var h_scroll = $(".second_drum_block").scrollTop();                                          // Определяем высоту скролла
            var medium_result = Math.round((h_scroll + heiht_drums_elem) / heiht_drums_elem);           // Переменная с результатом промежуточным (говорит какой элемент по счету выбран)
            var x = $(".second_drum_content *");                                                         // Берем все элементы 
            second_drum_block_result = x[medium_result-1].innerHTML;                                     // Берем все элементы которые отстроили, затем берем порядковый номер который дал medium_result
            if(modal_time_is_constraction){
                result_mask = first_drum_block_result + ':' + second_drum_block_result; // Заносим результат в строку результата 
            };
            if(modal_date_is_constraction){
                result_mask = first_drum_block_result + ' ' + second_drum_block_result; // Заносим результат в строку результата 
            };
            if(modal_persons_is_constraction){
                result_mask = first_drum_block_result; // Заносим результат в строку результата 
            };
             $("#wr_block_result_input").val(result_mask);  // Заносим результат в строку результата 
        }); 
        
        /* конец - отслеживаем прокрутку на барабанах */

                            //function hours_append(){
                                     //var date = new Date();
                                     //var hour_value = date.getHours()+1;         // Берем текущее время
                                     //for (var i = hour_value; i <= 24; i++){     // Говори что i = текущему времени и если i меньше 24 то выполняем дествия
                                     //    hours [i-hour_value] = i;           
                                     //};

/* конец - ФУНКЦИЯ - ОТКРЫВАЕТ МОДАЛЬНОЕ ОКНО "ВЫБОР ВРЕМЕНИ" */


/* ФУНКЦИЯ - ОТКРЫВАЕТ МОДАЛЬНОЕ ОКНО "НАПИСАТЬ НАМ" */

        function mail_to(){
            close_all_modals();
            zalivka_active ();
            $(".mail_to_modal").css({"display":"block"});
        };

/* конец - ФУНКЦИЯ - ОТКРЫВАЕТ МОДАЛЬНОЕ ОКНО "НАПИСАТЬ НАМ" */
//
//
//
// --------------------------------------------- / конец - ОБЩИЕ ФУНКЦИИ / --------------------------------------------------- // 

// --------------------------------------------- / КЛИКИ + ОБРАБОТЧИКИ НАЖАТИЙ / --------------------------------------------------- // 
//
//
//
//
/* ПРАВИЛА ДЛЯ HOVER */
        $(this).on("touchstart", ".all_but_medium_wr", function(){
            $(this).addClass("all_but_medium_wr_hover");
        });
        $(this).on("touchend touchmove", ".all_but_medium_wr", function(){
            $(".all_but_medium_wr").removeClass("all_but_medium_wr_hover");
        });

        $(".but_call_wrap").on("touchstart", function(){
            $(this).addClass("but_call_wrap_hover");
        });
        $(".but_call_wrap").on("touchmove touchend", function(){
            $(this).removeClass("but_call_wrap_hover");
        });

        $(".all_menu_item").on("touchstart", function(){ // Клик на любом пункте меню пункте меню / добавляем класс для подсветки типо ховер
            $(this).addClass("all_menu_item_hover");
        });
        $(".all_menu_item").on("touchmove touchend", function(){
            $(this).removeClass("all_menu_item_hover");
        });

        $(".close_modal").on("touchstart", function(){ // Клик на крестик закрыть окно / добавляем класс для подсветки типо ховер
            $(this).addClass("close_modal_hover");
        });
        $(".close_modal").on("touchmove touchend", function(){
            $(this).removeClass("close_modal_hover");
        });

        $(".all_modals_content").on("touchstart", "label", function(){ // Клик любом пункте фодального окна фильтр / добавляем класс для подсветки типо ховер
            $(this).addClass("resto_filtr_input_hover");
        });
        $(".all_modals_content").on("touchmove touchend", "label", function(){
            $(this).removeClass("resto_filtr_input_hover");
        });

        $(".all_filtr_wr_active .pointer").on("touchstart", function(){ // Клик на крестик на заполненном фильтре / добавляем класс для подсветки типо ховер
            $(this).addClass("close_modal_hover");
        });
        $(".all_filtr_wr_active .pointer").on("touchmove touchend", function(){
            $(this).removeClass("close_modal_hover");
        });
/* конец - ПРАВИЛА ДЛЯ HOVER */

/* ПРАВИЛА ДЛЯ INPUT */ /* исправление бага */
$("*").on("touchend", ".input_stop_click", function () {
    $(this).removeAttr("readonly");
});       


$("*").on("focusout", ".input_stop_click", function () {
    $(this).attr("readonly", "readonly");
});  
/* конец - ПРАВИЛА ДЛЯ INPUT */

/* ОБРАБОТЧИК НАЖАТИЯ КНОПКИ BACK */

navigator.Backbutton.goHome(function() {
  alert('success')
}, function() {
  alert('fail')
});
        /*document.addEventListener("deviceready", onDeviceReady, false);
        function onDeviceReady() {
                document.addEventListener("backbutton", onBackKeyDown, true); // создаем обработчик события для кнопки back
        }
        function onBackKeyDown() { //описываем что происходит после нажатия кнопки back 
            //alert("Было нажатие. Массив:  ");
                if (zalivka_on === true){
                        close_all_modals();
                }
                else {
                    
                        if (mas_back_but.length == 1){
                                navigator.app.exitApp();
                        }
                        while (mas_back_but[mas_back_but.length-1] == mas_back_but[mas_back_but.length-2]) { // Запускаем цикл, сравниваем 2 крайних значения массива / если они одинавовы, то удаляем последний (для того чтобы при нажатии на back открывалась предидущая страница отличная от текущей)
                                //alert("    Крайнее значение  - " + mas_back_but[mas_back_but.length-1] + "    Значение -1  - " + mas_back_but[mas_back_but.length-2]);
                                mas_back_but.splice(mas_back_but.length-1,1);
                        }
                        switch(mas_back_but[mas_back_but.length-2]) {
                                case "content_vse_restorani_on":        mas_back_but.splice(mas_back_but.length-2,2);
                                                                        str_vse_rest_active ();
                                                                        break;
                                case "content_zabronirovat_stol_on":    mas_back_but.splice(mas_back_but.length-2,2);
                                                                        str_reserv_active ("empty");
                                                                        break;
                                case "content_str_filtr_on":            mas_back_but.splice(mas_back_but.length-2,2);
                                                                        str_poisk_param_active ();
                                                                        break;
                                case "content_pokazat_na_karte_on":     mas_back_but.splice(mas_back_but.length-2,2);
                                                                        all_menu_item();
                                                                        $(".content_pokazat_na_karte").css({"display":"block"});
                                                                        break;
                                case "content_izbrannoe_on":            mas_back_but.splice(mas_back_but.length-2,2);
                                                                        str_izbrannoe_active ();
                                                                        break;
                                case "content_moi_broni_on":            mas_back_but.splice(mas_back_but.length-2,2);
                                                                        str_moi_broni_active ();
                                                                        break;
                                case "content_moi_dannie_on":           mas_back_but.splice(mas_back_but.length-2,2);
                                                                        str_moi_dannie_active ();
                                                                        break;
                                case "content_str_restorana_on":        mas_back_but.splice(mas_back_but.length-2,2);
                                                                        resto_page ();
                                                                        break;
                        }
                }
        }*/
/* конец - ОБРАБОТЧИК НАЖАТИЯ КНОПКИ BACK */


/* КЛИК НА ЗАЛИВКУ, КРЕСТИК и тд. */
        $("#zalivka_modal, .close_modal, .menu_decor").on("touchend", function(){
                stop_click_if_move();
                close_all_modals ();
        });
/* конец - КЛИК НА ЗАЛИВКУ, КРЕСТИК и тд. */	


/* КЛИК НА КНОПКУ ЗАКАЗАТЬ ОБРАТНЫЙ ЗВОНОК */
        $(".but_call_wrap").on("touchend click", function(){
                stop_click_if_move();
                $(".call_modal").css({"display":"inline-block"});
                $("#zalivka_modal").css({"display":"inline-block"});
                zalivka_on = true;
        });

        $(".zakazat_zvonok_wr").find("input").on("touchend", function(){
                stop_click_if_move();
				if (value != "" && value != "undefined" && value != null) {
					var request = $.get('http://test_to_app.zakazstolov24.ru/callBack.php', {tel: value});
					request.error(function() {  alert("Во время отправки сообщения произошла ошибка. Вы можете проверить соединение с Интернет и попробовать еще раз или связаться с нами по телефону:  +7 (495) 722-00-23", "Ошибка"); });
					request.success(function() { alert("Мы свяжемся с Вами в ближайшее время.", "Сообщение отправленно"); });
					alert("С Вами свяжутся в ближайшее время.", "Звонок заказан");
				} else {
					alert("Для начала Вам нужно зарегистрироваться");
				}
        });

        $(".sdelat_zvonok_wr div").on("touchend click", function(){
            if (value != "" && value != "undefined" && value != null) {    
				stop_click_if_move();
                mail_to();
                $(".mail_to_modal textarea").val("");
			} else {
				alert("Для начала Вам нужно зарегистрироваться");
			}
        });
        $(".mail_to_modal .mail_to_but_reset").on("touchend click", function(){
                stop_click_if_move();
                $(".mail_to_modal textarea").val("");
        });

/* конец - КЛИК НА КНОПКУ КОНТАКТЫ */

/* КЛИК НА КНОПКУ НАПИСАТЬ НАМ */
	$(".mail_to_but_ok").find("input").on('click', function (){
		
			var napisat_nam = $("#mail_for_us").val();
			var request = $.get('http://test_to_app.zakazstolov24.ru/mail_for_us.php', {napisat_nam: napisat_nam, tel: value});
			request.error(function() {  alert("Во время отправки сообщения произошла ошибка. Вы можете проверить соединение с Интернет и попробовать еще раз или связаться с нами по телефону:  +7 (495) 722-00-23", "Ошибка"); });
			request.success(function() { alert("Ваше сообщение доставленно. Мы свяжемся с Вами в ближайшее время.", "Сообщение отправленно"); });
		
	});

/* конец - КЛИК НА КНОПКУ НАПИСАТЬ НАМ */

/* КЛИК НА МЕНЮ */
        $(".wr_menu").on("touchend touchmove", function(){                        // открывает левое меню по клику
                $(".menu_modal").css({"display":"block"});                              // отображаем меню
                zalivka_active ();                                                      // включаем заливку
                //$("input").focusout();
        });

        $(".menu_content, #zalivka_modal").on("touchmove", function(){                  // если по меню или заливке провести пальцем то закрываем его
                close_all_modals ();
         });
/* конец - КЛИК НА МЕНЮ */


/* КЛИК НА ПУНКТЕ МЕНЮ "ВСЕ РЕСТОРАНЫ" */
        $(".item_k_spisku_restoranov").on("touchend", function(){                 // Клик на пункте меню - К СПИСКУ РЕСТОРАНОВ
                stop_click_if_move();
                str_vse_rest_active ();
                all_resto();
         });
/* конец - КЛИК НА ПУНКТЕ МЕНЮ "ВСЕ РЕСТОРАНЫ" */


/* КЛИК НА РЕСТОРАНЕ в списке ресторанов */
        $('.content_vse_restorani, .content_filtr, .content_izbrannoe').on('touchend click', '.restoran_wr', function(){            //  Навешиваем события на вновь созданные элементы и отрабатываем на них клик
                stop_click_if_move();    
                click_na_restorane($(this));                                                    // Передаем в функцию переменную с коркретным зведением
                /*setTimeout( function() {                 
                    var x = $(this).offset().top - $(window).scrollTop();
                    if( (height_screen - x) <= 150){
                       jQuery(document).scrollTop(jQuery(document).scrollTop()+150);
                    }
                }, 300);*/
        });
/* конец - КЛИК НА РЕСТОРАНЕ в списке ресторанов */


/* КЛИК НА КНОПКЕ "ЕЩЕ" НА СТРАНИЦЕ РЕСТОРАНА */
        $('.but_eshe_str_rest_wr').on('touchend',"a", function(event){
                stop_click_if_move();
                $(".content_str_restorana").addClass("content_str_restorana_full_open");
                
                event.preventDefault();
                var top = $(".but_zabronirovat_str_rest_wr").offset().top;           //узнаем высоту от начала страницы до блока на который ссылается якорь
                $('body,html').animate({scrollTop: top}, 500);             //анимируем переход на расстояние - top за 1500 мс

        });
        
/* конец - КЛИК НА КНОПКЕ "ЕЩЕ" НА СТРАНИЦЕ РЕСТОРАНА */

/* КЛИК НА ОСОБЕННОСТИ НА СТРАНИЦЕ РЕСТОРАНА */
        $(".about_resto_feature").on("touchstart click", ".wr_img", function(){  // Клик на иконку особенностей
            var x = $(this).next();                 // В переменную берем следующий элемент после текущщего на который нажали
            var y = $(this).offset().left - 70;    // Смотрим расстояние до левой границы экрана
            x.css({"display":"block"});             
            x.css({"margin-left":y});
            setTimeout( function() { x.css({"display":"none"}) }, 1000); // Скрываем элемент через заданное время
        });
/* конец - КЛИК НА ОСОБЕННОСТЯХ НА СТРАНИЦЕ РЕСТОРАНА */

/* КЛИК НА КНОПКЕ ПОДРОБНЕЕ */
        $('.content_filtr, .content_vse_restorani, .content_izbrannoe').on('touchend', '.but_podrobnee_vse_rest_wr', function(){ // Навешивает события на вновь сожданные элементы посредствам ajax / $('где ищим новый dom элемент').on('click', 'название элемента', function(){ 
                stop_click_if_move();
                click_na_podrobnee ();
        });
/* КОНЕЦ - КЛИК НА КНОПКЕ ПОДРОБНЕЕ */


/* КЛИК НА КНОПКЕ "ПОКАЗАТЬ НА КАРТЕ" */
         $('.content_filtr, .content_vse_restorani, .but_map_str_rest_wr, .content_izbrannoe').on('touchend', '.but_map_vse_rest_wr', function(){
                stop_click_if_move();
                resto_in_map ($(".active_restoran .all_restoran_map_cords").text());
                content_pokazat_na_karte_on = true;
        });
    /* на стр. "самого ресторана" */
        $(".but_map_str_rest_wr").on("touchend", function(){
                stop_click_if_move();
                resto_in_map ($(".restoran_page_map_cords").text());
                content_pokazat_na_karte_on = true;
        });
/* конец - КЛИК НА КНОПКЕ "ПОКАЗАТЬ НА КАРТЕ" */

/* КЛИК НА ПУНКТЕ МЕНЮ "ФОРМА БРОНИРОВАНИЯ" */
	$(".item_forma_broni").on("touchend", function(){ // Клик на пункте меню - К ФОРМЕ БРОНИРОВАНИЯ
                stop_click_if_move();
                str_reserv_active("empty");
                $(".banner_forma_broni_empty_wr input").val("");
	});
/* конец - КЛИК НА ПУНКТЕ МЕНЮ "ФОРМА БРОНИРОВАНИЯ" */


/* КЛИК НА КНОПКЕ БРОНИРОВАНИЯ */
    /* на странице "ВСЕ РЕСТОРАНЫ" */
        $('.content_vse_restorani, .content_filtr, .content_izbrannoe').on('touchend', '.but_bron_vse_rest_wr', function(){
                stop_click_if_move();
                str_reserv_active("full");
        });
    /* на странице "РЕСТОРАНА" */
        $('.but_zabronirovat_str_rest_wr .all_but_medium_wr').on("touchend", function(){
                stop_click_if_move();
                str_reserv_active("full");
        });
/* конец - КЛИК НА КНОПКЕ БРОНИРОВАНИЯ */


/* КЛИК НА КНОПКЕ "В ИЗБРАННОЕ" на странице ресторана */
    	$(".but_izbrannoe_str_rest_wr").on("touchend", function(){ 
            stop_click_if_move();
            var resto_page_id = $(".restoran_page_id").text();
            var resto_page_name = $(".about_resto_name").text();
            if (favorites == null){
                favorites = resto_page_id + ",";
				alert("Ресторан добавлен в раздел 'Избранное заведения'.", "Успешно добавлен");
            } else {
                var favorites_id = favorites.split(",");
                var flag_id = true;
                for (var i = 0; i < favorites_id.length; i++){
                        if (favorites_id[i] == resto_page_id){
                                flag_id = false;
                                alert("Ресторан уже находится в разделе 'Избранные заведения'.", "Уже в избранном");
                        }
                }
                if (flag_id){
                        favorites = favorites + resto_page_id + ",";	
                        alert("Ресторан добавлен в раздел 'Избранное заведения'.", "Успешно добавлен");
                }
            }
            storage.setItem("favorites", favorites);
            $.get('http://test_to_app.zakazstolov24.ru/favorites.php', {tel: value, resto_id: resto_page_id, resto_name: resto_page_name});
        });
/* конец - КЛИК НА КНОПКЕ "В ИЗБРАННОЕ" на странице ресторана */


/* КЛИК НА ПУНКТЕ МЕНЮ "ФИЛЬТР ПО РЕСТОРАНАМ" */
	$(".item_menu_poisk_param").on("touchend", function(){                // Клик на пункте меню - ПОИСК ПО ПАРАМЕТРАМ (ФИЛЬТР)
                stop_click_if_move();
                str_poisk_param_active ();
	});
/* конец - КЛИК НА ПУНКТЕ МЕНЮ "ФИЛЬТР ПО РЕСТОРАНАМ" */


/* КЛИК НА ПУНКТЕ МЕНЮ "ПОКАЗАТЬ НА КАРТЕ" */
	$(".item_menu_poblizoti, .pokazat_na_carte").on("touchend", function(){     // Клик на пункте меню - ЗАВЕДЕНИЯ НА КАРТЕ и на кнопке "показать на карте" на стр. ресторана
                stop_click_if_move();
		all_menu_item();
                card_page(0, true);                                                 //вызываем функцию и строим карту
	});
/* конец - КЛИК НА ПУНКТЕ МЕНЮ "ПОКАЗАТЬ НА КАРТЕ" */


/* КЛИК НА ПУНКТЕ МЕНЮ "МОИ БРОНИ" */
	$(".item_menu_broni").on("touchend", function(){ // Клик на пункте меню - МОИ БРОНИ
                stop_click_if_move();
                str_moi_broni_active ();
	});
/* конец - КЛИК НА ПУНКТЕ МЕНЮ "МОИ БРОНИ" */


/* КЛИК НА ПУНКТЕ МЕНЮ "ИЗБРАННОЕ" */
	$(".item_menu_izbrannoe").on("touchend", function(){ // Клик на пункте меню - ИЗБРАННОЕ
                stop_click_if_move();
                str_izbrannoe_active ();
	});
/* конец - КЛИК НА ПУНКТЕ МЕНЮ "ИЗБРАННОЕ" */


/* КЛИК НА ПУНКТЕ МЕНЮ "МОИ ДАННЫЕ" */
	$(".item_menu_dannie").on("touchend", function(){ // Клик на пункте меню - МОИ ДАННЫЕ
                stop_click_if_move();
                str_moi_dannie_active ();
	});
/* конец - КЛИК НА ПУНКТЕ МЕНЮ "МОИ ДАННЫЕ" */

/* КЛИК НА ПОЛЕ ВЫБРАТЬ ВРЕМЯ "ФОРМА БРОНИРОВАНИЯ" */
	function form_booking(){
		stop_click_if_move();
		modal_chenge_param_active();
		time_append();
		$(".wr_block_result div").text("Планируемое время визита");
		$(".banner_forma_broni_empty_wr input").val("");
                $(".pojelaniy_broni_wr textarea").val("");
		modal_time_is_constraction = true;
	};
    $(".time_broni_wr input").on("touchend", function () {
		form_booking();
    });
/* конец - КЛИК НА ПОЛЕ ВЫБРАТЬ ВРЕМЯ "ФОРМА БРОНИРОВАНИЯ" */

/* КЛИК НА ПОЛЕ ВЫБРАТЬ ДАТЫ "ФОРМА БРОНИРОВАНИЯ" */
    $(".date_broni_wr input").on("touchend", function () {
            stop_click_if_move();
            modal_chenge_param_active();
            date_append();
            $(".wr_block_result div").text("Планируемая дата визита");
            modal_date_is_constraction = true;
    });
/* конец - КЛИК НА ПОЛЕ ВЫБРАТЬ ДАТЫ "ФОРМА БРОНИРОВАНИЯ" */

/* КЛИК НА ПОЛЕ ВЫБРАТЬ КОЛИЧЕСТВО ПЕРСОН "ФОРМА БРОНИРОВАНИЯ" */
    $(".number_person_wr input").on("touchend", function () {
            stop_click_if_move();
            modal_chenge_param_active();
            person_append();
            $(".wr_block_result div").text("Количество персон");
            $(".second_drum_block").css({"display":"none"});
            modal_persons_is_constraction = true;
    });
/* конец - КЛИК НА ПОЛЕ ВЫБРАТЬ КОЛИЧЕСТВО ПЕРСОН "ФОРМА БРОНИРОВАНИЯ" */

/* кнопка ок в модальном окне ВЫБРАТЬ ВРЕМЯ "ФОРМА БРОНИРОВАНИЯ" */
    $(".modal_param_change").on("touchend", ".all_but_medium_wr", function () {
            stop_click_if_move();
            close_all_modals();
            
            if(modal_time_is_constraction){
                $(".time_broni_wr input").val(result_mask);
                modal_time_is_constraction = false;
            }
            if(modal_date_is_constraction){
                $(".date_broni_wr input").val(result_mask);
                modal_date_is_constraction = false;
            }
            if(modal_persons_is_constraction){
                $(".number_person_wr input").val(result_mask);
                $(".second_drum_block").css({"display":"inline-block"});
                modal_persons_is_constraction = false;
            }
    });
/* конец - кнопка ок в модальном окне ВЫБРАТЬ ВРЕМЯ "ФОРМА БРОНИРОВАНИЯ" */

/* КЛИК НА КНОПКЕ - ПОДТВЕРЖДЕНИЕ БРОНИ */
    $(".reserv_submit_wr").on("touchend", function(){ // клик на значке помощь
        stop_click_if_move();
		var booking_flag = true;
        var booking_name = $(".banner_forma_broni_empty_wr input").val();
		if (booking_name.length == 0){
			booking_name = "Нет";
			var booking_flag = false;
		};
        var date_broni = $("#date_broni_input").val();
        var time_broni = $(".time_broni_wr input").val();
        var number_person = $(".number_person_wr input").val();
        var pojelaniy_broni = $(".pojelaniy_broni_wr textarea").val();
		var request = $.get('http://test_to_app.zakazstolov24.ru/booking.php', {resto_name: booking_name, date_broni: date_broni, time_broni: time_broni, number_person:number_person, pojelaniy_broni:pojelaniy_broni, tel_number: value});
		request.error(function() {  alert("Бронь не принята по причине отсутсвия доступа в Интернет. Вы можете забронировать стол по телефону:  +7 (495) 722-00-23", "Нет доступа к сети Интернет"); });
		request.success(function() { alert("Статус брони можно отследить на странице 'Мои брони'.", "Бронь принята"); });
		if (booking_flag){
			mas_back_but.splice(mas_back_but.length-2,2);
			resto_page ($(".active_restoran .all_restoran_id").text());
        } else {
			mas_back_but.splice(mas_back_but.length-2,2);
			str_vse_rest_active ();
			all_resto ();
		}
    });
/* конец - КЛИК НА КНОПКЕ - ПОДТВЕРЖДЕНИЕ БРОНИ */


/* КЛИК НА КНОПКЕ - ПОДКЛЮЧИТЬ КАРТУ */
	function new_card(flag_change){
		stop_click_if_move();
            var input = new Array(0);
            var flag = true;
            var flag_bin = false;
            input[0] = $(".reg_banck_wr input").val();
            input[1] = $(".reg_card_wr input").val();
            input[2] = $(".reg_fio_wr input").val();
            input[3] = $(".reg_phone_wr input").val();

            for (var i = 0; i < input.length; i++){
                if (input[i].length == 0) {
                        flag = false;
                };
            };
            if (flag){
				if (spisok_bin_flag){
					var bin = spisok_bin.getElementsByTagName('BIN');
					for (var i = 0; i < bin.length; i++){
						if (input[1] == spisok_bin.getElementsByTagName('BIN')[i].childNodes[0].nodeValue){
								flag_bin = true;
						}
					}
					if (flag_bin){
						var bank_name = $(".reg_banck_wr input").val();
						var user_fio = $(".reg_fio_wr input").val();
						var card_num = $(".reg_card_wr input").val();
						var phone_num = $(".reg_phone_wr input").val();
						
						var request = $.get('http://test_to_app.zakazstolov24.ru/forma_registr_processing.php', {bank_name: bank_name, user_fio: user_fio, card_num: card_num, phone_num:phone_num});
						if (flag_change == "new_pers"){
							request.error(function() {  alert("Для прохождения регистрации необходим доступ в Интернет. Все вопросы Вы можете задать по телефону: +7 (495) 722-00-23", "Ошибка"); });
							request.success(function() { value = input[3]; avtorizaciya (); alert("Поздравляем! Теперь Вы можете пользоваться приложение и посещать заведения со скидкой.", "Вы успешно зарегистрированны");    });
						} else {
							request.error(function() {  alert("Для внесения изменений необходим доступ в Интернет. Все вопросы Вы можете задать по телефону: +7 (495) 722-00-23", "Ошибка"); });
							request.success(function() { value = input[3]; avtorizaciya (); alert("Изменения сохранены.", "Все прошло успешно");    });
						}
						storage.setItem("tel",input[3]);
						
					} else {
						alert("Ваша карта не участвует в программе лояльности. За дополнительной информацией Вы можете обратится по телефону: +7 (495) 722-00-23", "Регистрация не состоялась");
					};
						
				} else {
					alert("Для прохождения регистрации необходим доступ в Интернет. Все вопросы Вы можете задать по телефону: +7 (495) 722-00-23", "Нет доступа к сети Интернет");
				};
            } else {
                alert("Пожалуйста, заполните все поля.", "Регистрация не состоялась");
            };
           
	};
	$(".content_str_reg").on("touchend", ".reg_submit_wr div", function(){ // клик на значке помощь
          new_card("new_pers"); 
	});
/* конец - КЛИК НА КНОПКЕ - ПОДКЛЮЧИТЬ КАРТУ */

/* ставим ограничение на ввод символов в поле БИН*/
$(".reg_card_wr input").keyup( function(event) {
    if (this.value.match(/[^0-9]/g)) {
        this.value = this.value.replace(/[^0-9]/g, "");
    } 
    var str = $(".reg_card_wr input").val();
    if (str.length > 6) {
        var str1 = str[0] + str[1] + str[2] + str[3] + str[4] + str[5];
        $(".reg_card_wr input").val("");
        $(".reg_card_wr input").val(str1);
    }
});
/* конец - ставим ограничение на ввод символов в поле БИН*/

/* ставим ограничение на ввод символов в поле телефона*/
$(".reg_phone_wr input").keyup( function(event) {
    if (this.value.match(/[^0-9]/g)) {
        this.value = this.value.replace(/[^0-9]/g, "");
    } 
    var str = $(".reg_phone_wr input").val();
    if (str.length > 11) {
        var str1 = str[0] + str[1] + str[2] + str[3] + str[4] + str[5] + str[6] + str[7] + str[8] + str[9] + str[10];
        $(".reg_phone_wr input").val("");
        $(".reg_phone_wr input").val(str1);
    }
});
/* конец - ставим ограничение на ввод символов в поле телефона*/

/*КЛИК НА КНОПКУ УДАЛИТЬ БРОНЬ*/

	$(".content_moi_broni").on("touchend", ".delete_line_moi_broni", function(){
		stop_click_if_move();

		var name = $.trim($(this).parent().children(".moi_broni_resto_name").text());
		var time_action = $(this).parent().children(".moi_broni_text_data_zayavki").children(".css_font_size_14").text();
		var date_action = $(this).parent().children(".moi_broni_text_data_zayavki").children(".css_font_size_8").text();

		$.get('http://test_to_app.zakazstolov24.ru/booking_del.php', {tel: value, resto_name: name, time_action: time_action, date_action: date_action});
		str_moi_broni_active ();
	});
	
/*конец - КЛИК НА КНОПКУ УДАЛИТЬ БРОНЬ*/
	
/*КЛИК НА КНОПКУ УДАЛИТЬ ИЗ ИЗБРАННОГО*/
	$(".content_izbrannoe").on("touchend", ".delete_line_moi_broni", function(){
		var resto_id = $.trim($(this).prev().children(".restoran_content").children(".all_restoran_id").text());
		
		$.get('http://test_to_app.zakazstolov24.ru/favorites_del.php', {tel: value, resto_id: resto_id});
		for (var i = 0; i < favorites.length; i++){
			if (favorites[i] == resto_id){
				var str1 = favorites[i]+",";
				favorites = favorites.replace(str1, "");	
			}
		}
		str_izbrannoe_active ();
	});

/*конец - КЛИК НА КНОПКУ УДАЛИТЬ ИЗ ИЗБРАННОГО*/
//
//
//
//
// --------------------------------------------- / конец - КЛИКИ + ОБРАБОТЧИКИ НАЖАТИЙ / --------------------------------------------------- // 

// --------------------------------------------- / СТРАНИЦА ПОИСКА / ----------------------------------------------------------------------- // 
//
//
//
//
/* ВЫБОР ПУНКТОВ - СРЕДНИЙ ЧЕКА/МТЕРО/КУХНИ/ОСОБЕННОСТИ НА СТРАНИЦЕ ФИЛЬТРА */
        $('.all_modals_content, .filtr_block_radio_but').on('touchend', 'label', function(){
                stop_click_if_move();
                if($(this).prev().is(':checked')){
                        $(this).prev().prop("checked", false);
                }
                else{
                        $(this).prev().prop("checked", true);
                }
        });
    /* На странице фильтра - выбор среднего чека */
        $(".filtr_block_radio_but").on('touchend', 'label', function(){
                stop_click_if_move();
                count_resto();
        });
    /* конец - На странице фильтра - выбор среднего чека */
    /* Выбор банка в модальном окне */
        $(".filtr_banck_modal").on('touchend', 'label', function(){
                stop_click_if_move();
                var radio_banck = $(".filtr_banck_modal input:checked").next().text();
                $(".reg_banck_wr input").val(radio_banck);
                close_all_modals();
        });
    /* конец - выбор банка в модальном окне */    
        
/* конец - ВЫБОР ПУНКТОВ - СРЕДНИЙ ЧЕКА/МТЕРО/КУХНИ/ОСОБЕННОСТИ НА СТРАНИЦЕ ФИЛЬТРА */


/* МОДАЛЬНОЕ ОКНА ВЫБОР БАНКА */
    var reg_banck_postroeno = false;
    $(".content_str_reg").on("touchend", ".reg_banck_wr *", function(){ // клик на значке помощь
            stop_click_if_move();
            if (zalivka_on === false){
                    $(".filtr_banck_modal").css({"display":"inline-block"});
                    $("#zalivka_modal").css({"display":"inline-block"});
                    zalivka_on = true;
            } 
        /* Выводим банки */
            if (reg_banck_postroeno === false){
                var bancks = ["АО «Банк Русский Стандарт»","ОАО «БАНК РОССИЙСКИЙ КРЕДИТ»","ОАО АКБ «Пробизнесбанк»","ООО КБ «Богородский»","ООО «Интерактивный Банк»"];
                $.each(bancks, function(i,bancks) {
                    $('<input/>', {
                        type: 'radio',
                        name: 'vibor_banka  ',
                        id:     bancks,
                        class: 'banck_checkbox all_banck_filtr_input'
                    }).appendTo($("#filtr_banck_modal_content"));
                    $('<label/>', {
                        //for: metros
                    }).append(bancks).appendTo($("#filtr_banck_modal_content"));
                });
                reg_banck_postroeno = true;
            };    
        /* Конец - Выводим банки */
    });
/* КОНЕЦ - МОДАЛЬНОЕ ОКНА ВЫБОР БАНКА */


/* МОДАЛЬНОЕ ОКНА ФИЛЬТР "ВЫБРАТЬ МЕТРО" */
    
	var metro_postroeno = false;
	var metros = ["Авиамоторная","Автозаводская","Академическая","Александровский сад","Алексеевская","Алтуфьево","Аннино","Арбатская","Аэропорт","Бабушкинская","Багратионовская","Баррикадная","Бауманская","Беговая","Белорусская","Беляево","Бибирево","Библиотека им. Ленина","Борисово","Боровицкая","Ботанический сад","Братиславская","Бульвар адм. Ушакова","Бульвар Дмитрия Донского","Варшавская","ВДНХ","Владыкино","Водный стадион","Войковская","Волгоградский пр-т","Волжская","Волоколамская","Воробьевы горы","Выставочная","Выставочный центр","Выхино","Динамо","Дмитровская","Добрынинская","Домодедовская","Достоевская","Дубровка","Жулебино","Зябликово","Измайловская","Калужская","Кантемировская","Каховская","Каширская","Киевская","Китай-город","Кожуховская","Коломенская","Комсомольская","Коньково","Красногвардейская","Краснопресненская","Красносельская","Красные ворота","Крестьянская застава","Кропоткинская","Крылатское","Кузнецкий мост","Кузьминки","Кунцевская","Курская","Кутузовская","Ленинский пр-т","Лубянка","Люблино","Марксистская","Марьина роща","Марьино","Маяковская","Медведково","Международная","Менделеевская","Митино","Молодежная","Мякинино","Нагатинская","Нагорная","Нахимовский пр-т","Новогиреево","Новокосино","Новокузнецкая","Новослободская","Новые черемушки","Октябрьская","Октябрьское поле","Орехово","Отрадное","Охотный ряд","Павелецкая","Парк культуры","Парк победы","Партизанская","Первомайская","Перово","Петровско-Разумовская","Печатники","Планерная","Площадь Ильича","Площадь революции","Полежаевская","Полянка","Пражская","Преображенская пл.","Пролетарская","Проспект мира","Профсоюзная","Пр-т Вернадского","Пушкинская","Пятницкое шоссе","Речной вокзал","Рижская","Римская","Рязанский проспект","Савеловская","Свиблово","Севастопольская","Семеновская","Серпуховская","Славянский бульвар","Смоленская","Сокол","Сокольники","Спортивная","Сретенский бульвар","Строгино","Студенческая","Сухаревская","Сходненская","Таганская","Тверская","Театральная","Текстильщики","Телецентр","Теплый стан","Тимирязевская","Третьяковская","Трубная","Тульская","Тургеневская"," Тушинская","Ул. ак. Королева","Ул. ак. Янгеля","Ул. Горчакова","Ул. Милашенкова","Ул. С. Эйзенштейна","Улица Скобелевская","Ул. Старокачаловская","Улица 1905 года","Университет","Фили","Фрунзенская","Царицино","Цветной бульвар","Черкизовская","Чертановская","Чеховская","Чистые пруды","Чкаловская","Шаболовская","Шипиловская","Шоссе энтузиастов","Щелковская","Щукинская","Электрозаводская","Юго-Западная","Южная","Ясенево"];
	/*подсчет ресторанов у станции метро*/
    function counting_rest_in_metro(metro_name){
		var counter = 0;
		for (var i = 0; i < x.getElementsByTagName("R_MERTO_MAIN").length; i++){
			var metro_station_name = x.getElementsByTagName("R_MERTO_MAIN")[i].childNodes[0].nodeValue;
			
			if (metro_station_name.toLowerCase() == metro_name.toLowerCase()){
				counter++;
			}
		}
		return(counter);
	};
	/*конец - подсчет ресторанов у станции метро*/
        
	/* Выводим станции метро */
        function all_metro(metro_station){
		if (metro_postroeno === false){
			$.each(metro_station, function(i,metro_station) {
				var metro_station_array = metro_station.split(",");
				$('<input/>', {
					type: 'checkbox',
					id:     metro_station_array[0],
					class: 'metro_checkbox all_resto_filtr_input'
				}).appendTo($("#filtr_metro_modal_content"));
				
				$('<label/>', {
					//for: metro_station
				}).append(metro_station_array[0] + ' (' + metro_station_array[1]+ ')').appendTo($("#filtr_metro_modal_content"));
			});
			metro_postroeno = true;
		};    
	/* Конец - Выводим станции метро */
	};
        
    /* Клик - на пункте фильтра метро */    
    $(".filtr_metro_wr .text_div").on("touchend", function(){ // клик на значке помощь
        stop_click_if_move();
        if (zalivka_on === false){
                $(".filtr_metro_modal").css({"display":"inline-block"});
                $("#zalivka_modal").css({"display":"inline-block"});			
                zalivka_on = true;
        } 
		for (var i = 0; i < metros.length; i++){
			var str = metros[i] +","+counting_rest_in_metro(metros[i]);
			metros[i] = str;
		}
        all_metro(metros);    
    });
    /* конец - Клик - на пункте фильтра метро */
    
	
    /* Поиск станции метро в модальном окне 'поиск по метро' */
    $(".metro_search").keyup(function(eventObject){ //поиск по метро
            $(".filtr_metro_modal form *").remove();
            metro_postroeno = false;
			var new_metro_station = new Array(0);
			var pole_poiska = $(".metro_search").val(); // берем напечатанный поисковый запрос 
			function new_metro_list(){
				for (var i = 0; i < metros.length; i++){ //перебираем элементы по названию метро
						if ( metros[i].toLowerCase().indexOf(pole_poiska.toLowerCase()) < 0 ){ // если запросы не савподают, то идем по циклу дальше / также приводим вводимые значения и значения и XML к нижнему регистру

						}
						else { // если такой ресторан есть, то его отрисовываем   
								var str = metros[i] + ", "+counting_rest_in_metro(metros[i]);
								new_metro_station[new_metro_station.length] = str;                   //вызываем функцию помещающую новый ресторан в DOM
						}
				}
				all_metro(new_metro_station);
			}
            
			
			new_metro_list();
			//alert(eventObject.keyCode);
			
            
    });
    /* Конец - Поиск станции метро в модальном окне 'поиск по метро' */
    
	
/* конец - МОДАЛЬНОЕ ОКНА ФИЛЬТР "ВЫБРАТЬ МЕТРО" */


/* МОДАЛЬНОЕ ОКНА ФИЛЬТР "ВЫБРАТЬ КУХНЮ" */
var kitchen_postroeno = false;
    $(".filtr_kitchen_wr .text_div").on("touchend", function(){ // клик на значке помощь
            stop_click_if_move();
            if (zalivka_on === false){
                    $(".filtr_kitchen_modal").css({"display":"inline-block"});
                    $("#zalivka_modal").css({"display":"inline-block"});			
                    zalivka_on = true;
            } 
        /* Выводим тип кухни */
            if (kitchen_postroeno === false){
                var kitchens = ["Авторская","Азербайджанская","Азиатская","Американская","Английская","Арабская","Армянская","Вегетарианская","Восточная","Вьетнамская","Грузинская","Домашняя","Еврейская","Европейская","Индийская","Итальянская","Кавказская","Китайская","Корейская","Мангал","Мексиканская","Мясная","Немецкая","Паназиатская","Русская","Рыбная","Северная","Смешанная","Средиземноморская","Тайская","Турецкая","Узбекская","Украинская","Французская","Чешская","Японская"];
                $.each(kitchens, function(i,kitchens) {
                    $('<input/>', {
                        type: 'checkbox',
                        id:     kitchens,
                        class: 'kitchen_checkbox all_resto_filtr_input'
                    }).appendTo($("#filtr_kitchen_modal_content"));
                    $('<label/>', {
                        //for: kitchens
                    }).append(kitchens).appendTo($("#filtr_kitchen_modal_content"));
                });
                kitchen_postroeno = true;
            };    
        /* конец - Выводим тип кухни */
    });
/* конец - МОДАЛЬНОЕ ОКНА ФИЛЬТР "ВЫБРАТЬ КУХНЮ" */


/* МОДАЛЬНОЕ ОКНА ФИЛЬТР "ВЫБРАТЬ ОСОБЕННОСТИ" */
var osobennost_postroeno = false;
    $(".filtr_osobennost_wr .text_div").on("touchend", function(){ // клик на значке помощь
            stop_click_if_move();
            if (zalivka_on === false){
                    $(".filtr_osobennost_modal").css({"display":"inline-block"});
                    $("#zalivka_modal").css({"display":"inline-block"});			
                    zalivka_on = true;
            } 
        /* Выводим особенности */
            if (osobennost_postroeno === false){
                var osobennosti = ["3D-панорама","Dj","Go-Go","VIP-зона","Активный отдых","Алкоголь","Бесплатный wi-fi","Бильярд","Дартс","Детское меню","Дискотека","Еда на вынос","Живая музыка","Завтраки","Загородный","Кальян","Караоке","Кино-показы","Корабль","Курящая зона","Летняя веранда","Мясной","На крыше","Настольные игры","Организация праздников","Парковка","Пивной","Рыбный","Спортивные трансляции","Стриптиз","Сцена","Терасса","У воды","Шоу программа"];
                $.each(osobennosti, function(i,osobennosti) {
                    $('<input/>', {
                        type: 'checkbox',
                        id:     osobennosti,
                        class: 'osobennost_checkbox all_resto_filtr_input'
                    }).appendTo($("#filtr_osobennost_modal_content"));
                    $('<label/>', {
                        //for: osobennosti
                    }).append(osobennosti).appendTo($("#filtr_osobennost_modal_content"));
                });
                osobennost_postroeno = true;
            };    
        /* Конец - Выводим особенности */
    });
/* КОНЕЦ - МОДАЛЬНОЕ ОКНА ФИЛЬТР "ВЫБРАТЬ ОСОБЕННОСТИ" */


/* КНОПКА ОК В МАДАЛЬНЫХ ОКНАХ / ВЫВОД ВЫБРАННЫХ INPUT-ов */
    /* кнопка ок в модальном окне alert */
        $(".new_alert_modal .all_ok_close_but, .change_time_modal .all_ok_close_but").on("touchend", function(){
                stop_click_if_move();
                close_all_modals();
        });
    /* конец - кнопка ок в модальном окне alert */

    
    /* кнопка ок в модальном окне ВЫБРАТЬ ДАТЫ "ФОРМА БРОНИРОВАНИЯ" */
        $(".change_date_modal .all_ok_close_but").on("touchend", function () {
                stop_click_if_move();
                close_all_modals ();
                var x = $(".change_date_modal .block_result_changed_date").val();
                $(".date_broni_input").text(x);
        });
    /* конец - кнопка ок в модальном окне ВЫБРАТЬ ДАТЫ "ФОРМА БРОНИРОВАНИЯ" */


    /* Выбор метро */
        $(".filtr_metro_modal .all_ok_close_but").on("touchend", function(){
            stop_click_if_move();
            var metro = $(".metro_checkbox").get();
            var x = "";
            for (var i = 0; i < metro.length; i++){
                    if (metro[i].checked){
                          x = x + "<span>" + metro[i].nextElementSibling.innerHTML + "</span>" + "</br>";
                    }
            }
            
        /* Меняем стиль формы если фильтр активен */
            if(x.length > 0){ // Если в переменной Х есть данные то.. 
                   $(".filtr_metro_wr").addClass("all_filtr_wr_active"); // .. добавляем новый класс для элемента и стилизуем его в CSS
            }
            else{   // Нет данных то..
                  $(".filtr_metro_wr").removeClass("all_filtr_wr_active"); // .. удаляем класс
                  x = "ВЫБЕРИТЕ МЕТРО"; // В переменную записыаем текст по умолчанию
            }
        /* Конец - Меняем стиль формы если фильтр активен */
            $(".filtr_metro_wr .text_div").text("").append(x);
            close_all_modals();
            count_resto();
        });
        /* Клик на крестике сбросить фильтр */
        $(".filtr_metro_wr .pointer_close").on("touchend", function(){
                stop_click_if_move();
				$(".metro_search").val("");
                $(".filtr_metro_wr .text_div").text("ВЫБЕРИТЕ МЕТРО"); // В переменную записыаем текст по умолчанию
                $(".filtr_metro_wr").removeClass("all_filtr_wr_active"); // удаляем класс
                $("#filtr_metro_modal_content input").prop("checked", false);
                count_resto();
        });
        /* Конец -Клик на крестике сбросить фильтр */
    /* Конец - Выбор метро */
    
    /* Выбор тип кухни */
        $(".filtr_kitchen_modal .all_ok_close_but").on("touchend", function(){
            stop_click_if_move();
            var kitchen = $(".kitchen_checkbox").get();
            var x = "";
            for (var i = 0; i < kitchen.length; i++){
                if (kitchen[i].checked){
                    x = x + "<span>" + kitchen[i].nextElementSibling.innerHTML + "</span>" + "</br>";
                }
            }
        /* Меняем стиль формы если фильтр активен */
            if(x.length > 0){ // Если в переменной Х есть данные то.. 
                $(".filtr_kitchen_wr").addClass("all_filtr_wr_active"); // .. добавляем новый класс для элемента и стилизуем его в CSS
            }
            else{   // Нет данных то..
                $(".filtr_kitchen_wr").removeClass("all_filtr_wr_active"); // .. удаляем класс
                x = "ВЫБЕРИТЕ ТИП КУХНИ"; // В переменную записыаем текст по умолчанию
            }
        /* Конец - Меняем стиль формы если фильтр активен */
            
            $(".filtr_kitchen_wr .text_div").text("").append(x);
            close_all_modals();
            count_resto();
        });
        /* Клик на крестике сбросить фильтр */
        $(".filtr_kitchen_wr .pointer_close").on("touchend", function(){
            stop_click_if_move();
            $(".filtr_kitchen_wr .text_div").text("ВЫБЕРИТЕ ТИП КУХНИ"); // В переменную записыаем текст по умолчанию
            $(".filtr_kitchen_wr").removeClass("all_filtr_wr_active"); // удаляем класс
            $("#filtr_kitchen_modal_content input").prop("checked", false);
            //filtr_page_constr();
            count_resto();
        });
        /* Конец -Клик на крестике сбросить фильтр */
    /* Конец - Выбор тип кухни */

    /* Выбор особенности */
        $(".filtr_osobennost_modal .all_ok_close_but").on("touchend", function(){
            stop_click_if_move();
            var osobennost = $(".osobennost_checkbox").get();
            var x = "";
            for (var i = 0; i < osobennost.length; i++){
                if (osobennost[i].checked){
                    x = x + "<span>" + osobennost[i].nextElementSibling.innerHTML + "</span>" + "</br>";
                }
            }
        /* Меняем стиль формы если фильтр активен */
            if(x.length > 0){ // Если в переменной Х есть данные то.. 
                $(".filtr_osobennost_wr").addClass("all_filtr_wr_active osobennost_filtr_wr_active"); // .. добавляем новый класс для элемента и стилизуем его в CSS
            }
            else{   // Нет данных то..
                $(".filtr_osobennost_wr").removeClass("all_filtr_wr_active osobennost_filtr_wr_active"); // .. удаляем класс
                x = "ВЫБЕРИТЕ ОСОБЕННОСТИ"; // В переменную записыаем текст по умолчанию
            }
        /* Конец - Меняем стиль формы если фильтр активен */
            
            $(".filtr_osobennost_wr .text_div").text("").append(x);
            close_all_modals();
            count_resto();
        });
        
        /* Клик на крестике сбросить фильтр */
        $(".filtr_osobennost_wr .pointer_close").on("touchend", function(){
            stop_click_if_move();
            $(".filtr_osobennost_wr .text_div").text("ВЫБЕРИТЕ ОСОБЕННОСТИ"); // В переменную записыаем текст по умолчанию
            $(".filtr_osobennost_wr").removeClass("all_filtr_wr_active"); // удаляем класс
            $("#filtr_osobennost_modal_content input").prop("checked", false);
            //filtr_page_constr();
            count_resto();
        });
        /* Конец -Клик на крестике сбросить фильтр */
    /* Конец - Выбор особенности */
    
/* КОНЕЦ - КНОПКА ОК В МАДАЛЬНЫХ ОКНАХ / ВЫВОД ВЫБРАННЫХ INPUT-ов */


/* КНОПКИ СБРОСИТЬ В МОДАЛЬНЫХ ОКНАХ на стр фильты */
        $(".filtr_banck_reset_but_wr input").on("touchend", function(){
                stop_click_if_move();
                $("#filtr_banck_modal_content input").prop("checked", false);
		
        });
        $(".filtr_metro_reset_but_wr input").on("touchend", function(){
                stop_click_if_move();
				$(".metro_search").val("");
                $("#filtr_metro_modal_content input").prop("checked", false);
                count_resto(); 
			
        });
        $(".filtr_kitchen_reset_but_wr input").on("touchend", function(){
                stop_click_if_move();
                $("#filtr_kitchen_modal_content input").prop("checked", false);
                count_resto(); 
				
        });
        $(".filtr_osobennost_reset_but_wr input").on("touchend", function(){
                stop_click_if_move();
                $("#filtr_osobennost_modal_content input").prop("checked", false);
                count_resto(); 
				
        });
/* конец - КНОПКИ СБРОСИТЬ В МОДАЛЬНЫХ ОКНАХ на стр фильты */
//
//
//
//
// --------------------------------------------- / конец - СТРАНИЦА ПОИСКА / --------------------------------------------------- // 

// --------------------------------------------- / ФИЛЬТР / -------------------------------------------------------------------- // 
//
//
//
//
function count_resto (){ //подсчет отмеченных input
	var filtr = {};
	filtr.bill = new Array(0); // средний счет
	filtr.metro = new Array(0); // метро
	filtr.feature = new Array(0); // особенности
	filtr.kitchen = new Array(0); //тип кухни

	var bill = $(".bill_radio").get(); //массив всех средних счетов
	var metro = $(".metro_checkbox").get(); // массив станций метро
	var feature = $(".osobennost_checkbox").get(); //массив особенностей
	var kitchen = $(".kitchen_checkbox").get(); //массив типов кухни

	for (var i = 0; i < bill.length; i++){ // выбираем отмеченные средние счета
		if (bill[i].checked){
			filtr.bill[filtr.bill.length] = bill[i].nextElementSibling.childNodes[0].innerHTML; // запоминаем в массив значение отмеченного среднего счета
		} 
	}
	for (var i = 0; i < metro.length; i++){ // выбираем отмеченные метро
		if (metro[i].checked){
			filtr.metro[filtr.metro.length] = metro[i].nextElementSibling.innerHTML;
		}    
	}
	for (var i = 0; i < feature.length; i++){ // выбираем отмеченные особенности
		if (feature[i].checked) {
			filtr.feature[filtr.feature.length] = feature[i].nextElementSibling.innerHTML;
		}    
	} 
	for (var i = 0; i < kitchen.length; i++){ // выбираем отмеченные типы кухни
		if (kitchen[i].checked){
			filtr.kitchen[filtr.kitchen.length] = kitchen[i].nextElementSibling.innerHTML;
		}    
	}
	filtr_search(filtr); // в соответствие с выбранными input отбираем рестораны
	/* Подстановка окончаний и вывод результата в виде текста на кнопку */
	var resto_end = "Ресторанов";
	if (filtr_rest.length%100 < 11 || filtr_rest.length%100 >14){
			switch(filtr_rest.length%10) {
					case 1: resto_end = " Ресторан"; break;
					case 2:
					case 3:
					case 4: resto_end = " Ресторана"; 
			}
	}
	$("#construction").val(filtr_rest.length + "  "+ resto_end + " найдено");
}
        /* Подстановка окончаний и вывод результата в виде текста на кнопку */


function filtr_search(filtr){ //заполняем массив элементов
        
	filtr_rest = [];
	var filtr_rest_new = new Array(0);
	var flag_metro = false;
	var flag_feature = false;
	var flag_kitchen = false;
	var flag_bill = false;
	
	for (var i = 0; i < x.getElementsByTagName('R_ID').length; i++){ // выбираем все рестораны
		var r_id =  x.getElementsByTagName('R_ID')[i].childNodes[0].nodeValue;
		filtr_rest[filtr_rest.length] = r_id;
	}
	
	for(var i = 0; i < filtr_rest.length; i++){ //отбираем по среднему чеку
		var str1 = x.getElementsByTagName('R_CHECK')[filtr_rest[i]-1].childNodes[0].nodeValue;
		for (var j = 0; j < filtr.bill.length; j++){
			if ( str1.toLowerCase() == filtr.bill[j] ){
					filtr_rest_new[filtr_rest_new.length] = filtr_rest[i];
					flag_bill = true;
			}
		}
	}
	if (flag_bill){
		filtr_rest = filtr_rest_new;
		filtr_rest_new = [];
	}
        for (var i = 0; i < filtr_rest.length; i++){ //отбираем по метро
            var str1 = x.getElementsByTagName("R_MERTO_MAIN")[filtr_rest[i]-1].childNodes[0].nodeValue;
            for (var j = 0; j < filtr.metro.length; j++){
            //alert('метро 1 - '+str1.toLowerCase()+' метро 2 - ' + filtr.metro[j].toLowerCase());
                var station = filtr.metro[j].split(" ");
                if (str1.toLowerCase() == station[0].toLowerCase()){
                    filtr_rest_new[filtr_rest_new.length] = filtr_rest[i];
                    flag_metro = true;
                }
            }
        }
    if ((flag_metro == false)&&(filtr.metro.length != 0))    //если есть выбранные станции метро, но под них не подходит ни один ресторан               
		filtr_rest = [];									 // то возвращаем пустой массив            
	if (flag_metro){  // если добавились новые станции метро, то обновляем массив
		filtr_rest = filtr_rest_new;
		filtr_rest_new = [];
	}
	for (var i = 0; i < filtr_rest.length; i++){ //отбираем по особенностям
		var str1 = x.getElementsByTagName("R_OSOBENNOSTI")[filtr_rest[i]-1].childNodes[0].nodeValue;
		var feature_arr = str1.split(','); // разбиваем строку на массив
		var flag = 0;
		for (var j = 0; j < filtr.feature.length; j++){
			for (var k = 0; k < feature_arr.length; k++){
				var feature_rest;
				switch (feature_arr[k]){            // соотносим код особенности с текстовым значением
					case "1":                           // Если значение = 1, то..
						feature_rest = "Бесплатный wi-fi";      // Присваеваем переменной нужное значение для последующей отработки в css
					break
					case "2": feature_rest = "Парковка"; break
					case "3": feature_rest = "Курящая зона"; break
					case "4": feature_rest = "Завтрак"; break
					case "5": feature_rest = "Бизнес ланч"; break
					case "6": feature_rest = "Живая музыка"; break
					case "7": feature_rest = "Еда на вынос"; break
					case "8": feature_rest = "DJ"; break
					case "9": feature_rest = "Караоке"; break
					case "10": feature_rest = "Кальян"; break
					case "11": feature_rest = "Спортивные трансляции"; break
					case "12": feature_rest = "Дискотека"; break
					case "13": feature_rest = "Летняя веранда"; break
					case "14": feature_rest = "Активный отдых"; break
					case "15": feature_rest = "VIP-зал"; break
					case "16": feature_rest = "Крепкий алкоголь"; break
					case "17": feature_rest = "Персонал владеет иностранным языком"; break 
					case "18": feature_rest = "Танцпол"; break
					case "19": feature_rest = "Детское меню"; break
					case "20": feature_rest = "Детская комната"; break 
					case "21": feature_rest = "Кредитная карта"; break
					case "22": feature_rest = "rating_5"; break
					case "23": feature_rest = "Загородный"; break
					case "24": feature_rest = "3D-панорама"; break
					case "25": feature_rest = "Организация праздников"; break
					case "26": feature_rest = "Бильярд"; break
					case "27": feature_rest = "Дартс"; break 
					case "28": feature_rest = "Настольные игры"; break
					case "29": feature_rest = "Шоу программа"; break
					case "30": feature_rest = "Go-Go"; break 
					case "31": feature_rest = "Стриптиз"; break
					case "32": feature_rest = "Кино-показы"; break
					case "33": feature_rest = "Корабль"; break
					case "34": feature_rest = "На крыше"; break
					case "35": feature_rest = "У воды"; break
					case "36": feature_rest = "Терасса"; break
					case "37": feature_rest = "Мясной"; break 
					case "38": feature_rest = "Рыбный"; break
					case "39": feature_rest = "Пивной"; break
					case "40": feature_rest = "Сцена"; break 
				}
			
				if (filtr.feature[j].toLowerCase() == feature_rest.toLowerCase()){
					flag++;
				}
			}
		}
		if (flag == filtr.feature.length){
			filtr_rest_new[filtr_rest_new.length] = filtr_rest[i];
			flag_feature = true;
		}
	}
	if ((flag_feature == false)&&(flag_feature.length != 0)) //если есть выбранные особенности, но под них не подходит ни один ресторан               
		filtr_rest = [];									 // то возвращаем пустой массив
	if (flag_feature){  // если добавились новые особенности, то обновляем массив
		filtr_rest = filtr_rest_new;
		filtr_rest_new = [];
	}
	for (var i = 0; i < filtr_rest.length; i++){ //отбираем по типу кухни
		var str1 = x.getElementsByTagName("KITCHEN")[filtr_rest[i]-1].childNodes[0].nodeValue;
		var kitchen_arr = str1.split(','); // разбиваем строку на массив
		var flag = 0;
		for (var j = 0; j < filtr.kitchen.length; j++){
			for (var k = 0; k < kitchen_arr.length; k++){
				if (filtr.kitchen[j].toLowerCase() == kitchen_arr[k].toLowerCase()){
					flag++;
				}
			}
		}
		if (flag == filtr.kitchen.length){
			filtr_rest_new[filtr_rest_new.length] = filtr_rest[i];
			flag_kitchen = true;    
		}
	}
	if ((flag_kitchen == false)&&(flag_kitchen.length != 0))   //если есть выбранные типы кухни, но под них не подходит ни один ресторан               
		filtr_rest = [];									   // то возвращаем пустой массив             
	if (flag_kitchen){  // если добавились новые особенности, то обновляем массив
		filtr_rest = filtr_rest_new;
		filtr_rest_new = [];
	}
}

function filtr_page_constr(){ //выводим отобранные элементы
        $(".restoran_wr").remove();
        for(var i=0; i < filtr_rest.length; i++){
                var r_id = x.getElementsByTagName('R_ID')[filtr_rest[i]-1].childNodes[0].nodeValue; // берем ID
                new_restron(r_id, "content_filtr"); //вызываем функцию помещающую новый ресторан в DOM
        }
}

/* КЛИК НА КНОПКЕ "ПОКАЗАТЬ ВСЕ ЗАВЕДЕНИЯ" */
$(".filtr_submit_wr").on("touchend","a", function (event) {     // Делаем прокрутку при нажатии на кнопку
    stop_click_if_move();
    filtr_page_constr();                                        //страница фильтров в изначальном виде
    event.preventDefault();                                     //отменяем стандартную обработку нажатия по ссылке
    var top = $(".filtr_submit_wr").offset().top;               //узнаем высоту от начала страницы до блока на который ссылается якорь
    $('body,html').animate({scrollTop: top}, 500);             //анимируем переход на расстояние - top за 1500 мс
});
/* конец - КЛИК НА КНОПКЕ "ПОКАЗАТЬ ВСЕ ЗАВЕДЕНИЯ" */

//
//
//
//
// --------------------------------------------- / конец - ФИЛЬТР / -------------------------------------------------------------------- //
//
//
//
//
    
     
    
/* ТЕСТИЛКА */


                
        /*if((this))$(".last_element")){

        }*/
        /*var scroll = jQuery(document).scrollTop();
        jQuery(document).scrollTop(scroll+50);*/

       // $(".all_contents").css({"display":"none"});
        //$(".content_str_restorana, .str_rest_info_block_2, .str_rest_info_block_3, .str_rest_info_block_4").css({"display":"block"});

 
/* КОНЕЦ - ТЕСТИЛКА */
  
    
});
