var part_url='result.html?add';
var opt = ['ram','hdd','cpu'];
var order ={
    'hdd_pricing':{},
    'ram_pricing':{},
    'cpu_pricing':{},
    'hdd_period' : [],
    'ram_period' : [],
    'period' : 'monthly',
    'free_pid' : '',
    'part_url' : '',
    'hdd_id' : '',
    'ram_id' : '',
    'os_id' : '',
    'license_id':'',
    'cpu_id' : '',
    'pid_id' : '',
    'curr_tariff': '',
    'curr_cpu': 2,
    'curr_hdd': 10,
    'curr_ram': 1,
    'curr_os': '',
    'curr_os_id': '',
    'curr_license_id': '',
    'license_price': 0,
    'os_data' : [],
    'hdd': [],
    'ram': [],
    'cpu':[],
    'data':[],
    'form_os_data':function(pid,os_id,os_data){
        if(!this[pid])this[pid]={};
        if(!this[pid]['os']){this[pid]['os']=[];this[pid]['os_data']={};}
        this[pid]['os'].push(os_id);
        this[pid]['os_data']=os_data;
    },
    'form_license_data':function(pid,id,data){
        if(!this[pid])this[pid]={};
        if(!this[pid]['license']){this[pid]['license']=[]}
        this[pid]['license'].push(id);
        this[pid]['license'].push(data);
    },
    'form_period_data':function(pid,period_data){
        if(!this[pid]){this[pid]={};}if(!this[pid]['period_data']){this[pid]['period_data']={};}
        this[pid]['period_data']=period_data;
    },
    'form_static_data':function(pid,option_name,option_data){
        if(!this[pid])this[pid]={};if(!this[pid][option_name])this[pid][option_name]='';
        this[pid][option_name]=option_data;
    },
    'is_free': function(){return(this.pid==this.free_pid)&&(this.free_pid!='')},
    'is_free_for_pid': function(pid){return((pid==this.free_pid)&&(this.free_pid!=''))},
    'form_part_url':function(){
        this.part_url='&pid='+ this.pid + '&period=' + this.period;
        if(order.curr_os_id) this.part_url+='&configoption['+order.os_id+']='+order.curr_os_id;
        if(order.curr_license_id) this.part_url+='&configoption['+order.license_id+']='+order.curr_license_id;
        if(order.is_free()){
            if(order.hdd_id!='' || order.hdd_id!== undefined || order.curr_hdd!='' || order.curr_hdd!== undefined) this.part_url+= '&configoption[' + order.hdd_id +']=' + order.curr_hdd;
            if(order.ram_id!='' || order.ram_id!== undefined || order.curr_ram!='' || order.curr_ram!== undefined) this.part_url+= '&configoption[' + order.ram_id +']=' + order.curr_ram;
            if(order.cpu_id!='' || order.cpu_id!== undefined || order.curr_cpu!='' || order.curr_cpu!== undefined) this.part_url+= '&configoption[' + order.cpu_id +']=' + order.curr_cpu;
            if(order.hdd_id!='' || order.hdd_id!== undefined || order.curr_hdd!='' || order.curr_hdd!== undefined) this.part_url+= '&configoption[' + order.hdd_id +']=' + order.curr_hdd;
        }
        return part_url+this.part_url},
    'form_datacart':function(){
        order.data ={};
        order.data['pid']=this.pid;
        order.data['period']=this.period;
        if(order.curr_os_id)order.data['configoption['+order.os_id+']']=order.curr_os_id;
        if(order.curr_license_id) order.data['configoption['+order.license_id+']']=order.curr_license_id;
        if(order.is_free()){
            if(order.hdd_id!='' || order.hdd_id!== undefined || order.curr_hdd!='' || order.curr_hdd!== undefined) order.data['configoption[' + order.hdd_id +']'] = order.curr_hdd;
            if(order.ram_id!='' || order.ram_id!== undefined || order.curr_ram!='' || order.curr_ram!== undefined) order.data['configoption[' + order.ram_id +']'] = order.curr_ram;
            if(order.cpu_id!='' || order.cpu_id!== undefined || order.curr_cpu!='' || order.curr_cpu!== undefined) order.data['configoption[' + order.cpu_id +']'] = order.curr_cpu;
            if(order.hdd_id!='' || order.hdd_id!== undefined || order.curr_hdd!='' || order.curr_hdd!== undefined) order.data['configoption[' + order.hdd_id +']'] = order.curr_hdd;
        }
        return order.data}
};
function add_val_to_cart(data){
    if(data!=null&&data!=''){console.log(data)}
    else window.location.href = order.form_part_url()}
function get_json(){
    $.ajax({url:'../jsondata/freevpslimits.json',type: 'GET',success:function(data){get_free_vps_limits(data)}})
    $.ajax({url:'../jsondata/products.json',type: 'GET',success:function(data){get_products(data)}})
}
function pricing(price){
    var period =1;
    if(order.period=='quarterly'){period =3}
    else if(order.period=='semiannually'){period =6}
    else if(order.period=='annually'){period =12}
    price=parseInt(price)+parseInt(order.license_price)/**parseInt(period)*/;
    $('#price_static_tariff>span.description_value').text(price).append('<i class="fa fa-rub"></i>')
    $('#price_free_tariff>span.description_value').text(price).append('<i class="fa fa-rub"></i>')}
function free_pricing(price){
    $.each(opt, function(){
        var period=order.period,p=this.toString()+'_pricing',c='#description_'+this.toString()+'>span.description_value';
        if(order[this.toString()+'_pricing'].options.option[0].pricing.RUB) {
            var curr_val=order[this][$('.slider_' + this).slider('values')[0]];
            /*if(Math.abs(curr_val-parseInt($('#description_'+this+' > span.description_value').val()))==10)curr_val=$('#description_'+this+' > span.description_value').val();
             */price +=
                parseInt(order[p].options.option[0].pricing.RUB[period]) * (parseInt(curr_val));
        }})
    return price;
}
function moveFromRight(){
    $('#os_chooser').addClass('hidden');
    $('#price_static_tariff').addClass('hidden');
    $('#license_chooser').addClass('hidden');
    $('#period_chooser').addClass('hidden');
    $('#order_static_tariff').addClass('hidden');
    changeBlockDuringScrolling(-1);
}
function moveFromLeft(){
    order.pid=order.free_pid;
    changeBlockDuringScrolling(1);
}


function changeBlockDuringScrolling(sign) {
    if(sign<0){
        var firstsign='-'; var secondsign='+'; var firstcolor ="black";var secondcolor ="white"; var widthdelta=0;
    }else{
        var firstsign='+'; var secondsign='-'; var firstcolor ="white";var secondcolor ="black";var widthdelta=500;
    }
    var left = $("#st-container-mark").css("left").substring(0,$("#st-container-mark").css("left").length-2)*100;
    var width = $("#st-container-mark").css("width").substring(0,$("#st-container-mark").css("width").length-2)*100-widthdelta;
    if((left - width)*sign <= 0){
        $("#st-container-mark").animate({"left": firstsign +"=50%"}, "slow");
        $("#st-container-stick").animate({"left": firstsign +"=50%"}, "slow");//st-container-stick
        $("#st-panel-1").animate({"left": secondsign +"=100%"}, "slow");
        $("#st-panel-2").animate({"left": secondsign +"=100%"}, "slow");
        $("#st-control-text-1").animate({"color": firstcolor}, "slow");
        $("#st-control-text-2").animate({"color": secondcolor}, "slow");
    }
}
$(document).ready ( function(){
    $('html, body').animate({scrollTop:0}, 'slow');
    get_json();
});

function get_products(data){
    if(data.error==null){
        $('#st-panel-1>.row')
            .append('<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 row hidden" id="os_chooser"></div>' +
            '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 row hidden" id="license_chooser">' +
            '<span class="description_span">Тип лицензии</span><select class="description_value form-control width_30perc display_inline-block"></select></div>' +
            '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 row hidden" id="period_chooser">' +
            '<span class="description_span">Период оплаты</span><select class="description_value form-control width_30perc display_inline-block"></select></div>' +
            '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 row hidden" id="price_static_tariff">' +
            '<span class="description_span">Стоимость</span><span class="description_value">300</i></span></div>'+
            '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 row hidden" id="order_static_tariff">' +
            '<button class="btn btn-error description_span" type="button">Заказать</button></div>');
        $('#st-panel-2')
            .append('<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 row" id="free_os_chooser"></div>' +
            '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 row" id="free_license_chooser">' +
            '<span class="description_span">Тип лицензии</span><select class="description_value form-control width_30perc display_inline-block"></select></div>' +
            '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 row" id="free_period_chooser">' +
            '<span class="description_span">Период оплаты</span><select class="description_value form-control width_30perc display_inline-block"></select></div>' +
            '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 row" id="price_free_tariff">' +
            '<span class="description_span">Стоимость</span><span class="description_value">300</span></div>'+
            '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 row" id="order_free_tariff">' +
            '<button class="btn btn-error description_span" type="button">Заказать</button></div>');
        get_vps_tariffs(data.result);}
    else{$('.errorbox').append('<p>Ошибка обновления тарифов. Попробуйте повторить Ваш запрос позже</p>')}
}

function add_static_tariff(list){
    if(list!='') {
        for(var i=0;i<list.length;i++){
            var part ='<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 " id="static_' +
                list[i].pid +'"><div class="div-';
                if(i%2==0){part+='danger">'}else{part+='info">'}
                part+='<h4>Тариф '+ list[i].name+'</h4>';
                part+='<span class="bs-cost">от ' +parseInt(parseInt(list[i].pricing.RUB.annually)/12)+'руб/м</span>';
                if(list[i].name=='256 MB')part+='<span>  Ram: 256 </span><span> SSD: 3 </span><span>CPU: 1*2500</span>';
                if(list[i].name=='512 MB')part+='<span>  Ram: 512 </span><span> SSD: 5 </span><span>CPU: 1*2500</span>';
                if(list[i].name=='1 GB')part+='<span>  Ram: 1024 </span><span> SSD: 10 </span><span>CPU: 1*2500</span>';
                if(list[i].name=='2 GB')part+='<span>  Ram: 2048 </span><span> SSD: 15 </span><span>CPU: 1*2500</span>';
                part+='</div></div>';$('#st-panel-1>.row').append(part);
                $("#static_"+list[i].pid).click(function(){
                    //order.curr_tariff = $(this).attr('id').split('_')[1];
                    order.pid = $(this).attr('id').split('_')[1];
                    $('#price_static_tariff .description_value').val(parseInt(order[order.pid].period_data.monthly)).append('<i class="fa fa-rub"></i>');
                    show_options_for_static_tariff($(this).attr('id').split('_')[1]);
                })
        }
    }
}
function show_options_for_static_tariff(id_tariff){
    append_os_data(id_tariff);
    append_license_data(id_tariff);
    append_period_data(id_tariff);
    $('#order_static_tariff button').click(function(){
        add_val_to_cart();
    })
    animate_static_part();
}
function animate_static_part(){
        $('#os_chooser').removeClass('hidden').css({'display': 'none'}).show("drop", { direction: "down" }, 1000);
        $('#price_static_tariff').removeClass('hidden').css({'display': 'none'}).show("drop", { direction: "down" }, 1000);
        $('#license_chooser').removeClass('hidden').css({'display': 'none'}).show("drop", { direction: "down" }, 1000);
        $('#period_chooser').removeClass('hidden').css({'display': 'none'}).show("drop", { direction: "down" }, 1000);
        $('#order_static_tariff').removeClass('hidden').css({'display': 'none'}).show("drop", { direction: "down" }, 1000);
        $("#vps-content").animate({'margin-top': '0em'}, 1000);
}
function append_license_data(pid){
    var part ='';
    if(pid==order.free_pid) {part='free_';order.pid=order.free_pid;}
    $('#'+part+'license_chooser>select>option').remove();
    $.each(order[pid].license[1],function(k,v){ var name='';
if(v.name!='no_license') name= v.name; else name='Без лицензии';
        $('#'+part+'license_chooser>select').append('<option value="'+ v.id +'">'+ name +'</option>');
    });
    $('#'+part+'license_chooser>select').change(function(){
        order.curr_license_id = $(this).val();
        $.each(order[order.pid].license[1],function(k,v){
            if(order.curr_license_id== v.id){
                order.license_price = parseInt(v.pricing.RUB[order.period]);
            }
        });
        order.license_id = order[order.pid].license[0];
        var price=0;
        if (order.pid != order.free_pid) {
            price = order[pid].period_data[order.period]
        }
        else {
            price = free_pricing(price)
        }
        pricing(price);
    });
}
function append_period_data(pid){
    $('#period_chooser > select > option').remove();
    $('#free_period_chooser > select > option').remove();
    var part ='';
    if(pid==order.free_pid) {part='free_';order.pid=order.free_pid;}
    $.each(order[pid]['period_data'],function(k,v){var name ='';
        if(v!="-1.00"){
            if(k=='monthly'){name ="1 месяц"}
            if(k=='quarterly'){name ="3 месяца"}
            if(k=='semiannually'){name ="6 месяцев"}
            if(k=='annually'){name ="1 год"}}
        if(name!='')$("#period_chooser>select").append(
            '<option class="' + k +' '+  '">' + name + '</option>'
        );
        if(name!='')$("#free_period_chooser>select").append(
            '<option class="' + k +' '+  '">' + name + '</option>'
        );
    });
    $('#period_chooser > select').change(function () {
        var val = $(this).val(), pid = order.pid, period = order.period, price = 0;
        $.each($(this).children(), function () {
            if (val == $(this).val()) period = order.period = $(this).attr('class').trim();
        });
        if (pid != order.free_pid) {
            price = order[pid].period_data[period]
        }
        else {
            price = free_pricing(price)
        }
        pricing(price);
    });$("#period_chooser>select").change();
    $('#free_period_chooser > select').change(function () {
        var val = $(this).val(), pid = order.pid, period = order.period, price = 0;
        $.each($(this).children(), function () {
            if (val == $(this).val()) period = order.period = $(this).attr('class').trim();
        });

        if (pid != order.free_pid) {
            price = order[pid].period_data[period]
        }
        else {
            price = free_pricing(price)
        }
        pricing(price);
    });
}
function append_os_data(pid){
    var part ='';
    if(pid==order.free_pid) {part='free_';order.pid=order.free_pid;}
    $('#'+part+'os_chooser>div').remove();
    var t={};
    $.each(order[pid].os_data,function(k,v){
        var name = v.name.split('-')[0].toLowerCase();
        if(!(name in t)){t[name] = name; $('#'+part+'os_chooser').append('<div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">' +
            '<div class="btn-group" id="'+part+'os_'+name+'">' +
            '<button type="button" class="btn btn-default dropdown-toggle" ' +
            'style="background: none; border: none;" data-toggle="dropdown"><img ' +
            'class="disabled-os" src="../assets/images/'+name+
            '_.png"/><img class="enabled-os" src="../assets/images/selected_os/os_'+name+
            '.png"/></button><ul class="dropdown-menu" style="min-height: 89px;">' +
            '</ul></div><div style="margin-left: 20px; font-weight: 400;">'+name+'</div></div>')}
        $('#'+part+'os_'+name+' ul').append('<li><a value="'+ v.id +'">'+ v.name +'</a></li>');
        $('#'+part+'os_'+name+' ul li a').click(function(){
            order.curr_os_id = $(this).attr('value');
            order.os_id=order[order.pid].os[0];
            order.curr_os = $(this).text().split('-')[0];
            changeImage();
        });
        $('#'+part+'os_chooser div.btn-group > ul:first > li:nth-child(1) > a').click();
    });


}
function changeImage(){
    $('.disabled-os').css({'display':'block'});
    $('.enabled-os').css({'display':'none'});
    if (order.curr_os!=null&&order.curr_os!=''){
        $('#description_os > span.description_value').text(order.curr_os);
        $('#os_'+order.curr_os+' button  img.enabled-os').css({'display':'block'});
        $('#os_'+order.curr_os+' button  img.disabled-os').css({'display':'none'});
        $('#free_os_'+order.curr_os+' button  img.enabled-os').css({'display':'block'});
        $('#free_os_'+order.curr_os+' button  img.disabled-os').css({'display':'none'});
    }
}
function get_free_vps_limits(data){
    if(data.error==null){construct_sliders(data);}
    else{$('#errorbox').append('<p>Ошибка обновления тарифов. Попробуйте повторить Ваш запрос позже</p>')
}}
function construct_sliders(data){
    order.limits=data.result.limits;
    for(obj in data.result.limits){$.each(data.result.limits[obj],function(key,value){
            if(key=='ram') order.ram.push(value);
            if(key=='hdd') order.hdd.push(value);
            if(key=='cpu'&&order.cpu[order.cpu.length-1]!=value) order.cpu.push(value);
        }
    )}
    var first=order.hdd[0],last=order.hdd[order.hdd.length-1];
    for(var n=first,i=0;i<last;i++,n++){order.hdd[i]=n;}
    for(i=0;i<opt.length;i++){draw_sliders(opt[i],order[opt[i]],order.limits);}
}
function draw_sliders(id,realvalues,limits){
    switch(id){
        case 'ram':rangeVal=false;break;
        default:rangeVal=true;break;}
    $( ".slider_"+id).slider({
        orientation: "horizontal",
        range: rangeVal,
        animate: true,
        values:[0],
        hideMaxHandle: true,
        customHandleClass: 'slHandle',
        min: 0,
        max: (id=='hdd')?(order[id].length - order[id][0]):(order[id].length - 1),
        slide: function( event, ui ) {on_slide_slider(event, ui, id)}
    });
    $('#description_'+id+'>span.description_value').text(parseInt(order[id][0]));order['curr'+id]=parseInt(order[id][0]);
}


function on_slide_slider(event, ui, id){
    $('#description_'+id+'>span.description_value').text(parseInt(order[id][ui.value]));
    $('#sliders > div.slider_hdd.free.ui-slider.ui-slider-horizontal.ui-widget.ui-widget-content.ui-corner-all.display_none > a:nth-child(3)').remove();
    order['curr_'+id]=parseInt(order[id][ui.value]);
    if(id=='ram'){
        if(order.limits!==undefined){
            var hddFirst =0, hddLast= order.hdd[0], cpuVal=order.cpu[0];
            $.each(order.limits,function(key,value){
                if(key==ui.value){hddLast=value.hdd;cpuVal=value.cpu}});
            update_slider_value('hdd',hddFirst,hddLast);
            update_slider_value('cpu',cpuVal,0);
        }else{
            update_slider_value('hdd',order.cpu[0],order.cpu[0]);
            update_slider_value('cpu',0,0);
        }
    }pricing(free_pricing(0));
}

function update_cpu_value(slideValue){
    var index=0;
    $.each(order.cpu,function(key,value){
        if(value==slideValue){index=key}})
    order.curr_cpu =slideValue;
    $('.slider_cpu').slider( {"value":index, values:[index],slide:function(){return false;}});
    $('#description_cpu>span.description_value').text(slideValue);
}
function update_hdd_value(first,last){
    $('.slider_hdd').slider( {"value":Number(first),values:[first,last]});
    $('#description_ssd>span.description_value').text($('.slider_hdd').slider( "value"));
}
function update_slider_value(id,first,last){
    if(id=='hdd'){update_hdd_value(first,last);}
    if(id=='cpu'){update_cpu_value(first)}
    else{$('.'+id+'Slider').slider( {"value":first,values:[first,last]});}
}


function get_vps_tariffs(data) {
        var list_of_static_tariff = [];
        $.each(data,function(k,v) {
            var pid = v.pid,  info = [];
            if(v.module=='vemanager'&&v.hidden!='on'&& v.pricing){
                $.each(v.configoptions.configoption, function (kk, vv) {
                    if (vv.name == 'OS') {order.form_os_data(pid,vv.id,vv.options.option)}
                    else{
                        if (vv.name.toLowerCase() == 'license') {
                            order.form_license_data(pid,vv.id,vv.options.option)}
                        else order[vv.name.toLowerCase()+'_id']= vv.id;order[vv.name.toLowerCase()+'_pricing']= vv;}
                });
                order.form_period_data(pid,v.pricing.RUB);
                $.each(v.description.toLowerCase().split(' '), function (kk, vv) {
                    if (vv != '' && vv != null) {
                        if (vv.split(':')[0] != 'ssd') {info.push(vv.split(':')[0])} else { info.push('hdd') }}
                });
                $.each(info,function(kk,vv) { if(kk%2==0)order.form_static_data(pid,vv,info[kk+1]) });
                if(v.name!='Free VPS') {list_of_static_tariff.push(v);}
                else{
                    order.free_pid = pid;
                    append_os_data(pid);
                    append_license_data(pid);
                    append_period_data(pid);
                    $('#order_free_tariff button').click(function(){
                        add_val_to_cart();
                    })}
            }

        });
        add_static_tariff(list_of_static_tariff);
}
