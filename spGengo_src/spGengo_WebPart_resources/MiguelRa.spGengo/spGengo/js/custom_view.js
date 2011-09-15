/**
 * Copyright (c) 2011 Miguel A. Ramos 
 * (mramosr85@gmail.com)
 *
 * This file is part of spGengo SharePoint Plugin.
 *
 * spGengo SharePoint Plugin is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * spGengo SharePoint Plugin is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License
 * along with spGengo SharePoint Plugin.  If not, see <http://www.gnu.org/licenses/>.
 */

/*
UI code. 
Tasks: 
- Provide UI controls
*/

// declare UI controls
 var btnCancel; 
 
 // home
 var btnShowSettings;
 var btnShowOrder;
 var btnShowOverview;
 var btnRefresh;
 
// Window
var wdMain;
var tabControl;

// tabSettings
var tabSetting;
var tblSetting;
var lbPrivateKey;
var txtPrivateKey;
var lbPublicKey;
var txtPublicKey;
var btnLogin;
var btnClearSett;
var chbxRemember;
var tblButtonsSetting;
var lblFooter;

// tabOrder
var tabOrder;
var tblRadios;
var tblOrder
var tblCombos;
var tblTitle;
var lbTrans;
var lbFrom;
var lbTitle;
var cbLanguage1;
var lbTo;
var cbLanguage2;
var lbTotal;
var lblTotalWords;
var wordsCount;
var lblTotalPrice;
var lbText;
var txtTextToTranslate;
var btnOrder;
var btnTierStandard;
var btnTierPro;
var btnTierUltra;
var btnTierMachine;
var lblTotalPrice;
var lbTier;
var txtComment;
var tblTotals;
var lblFooterOrder;

// tabOverview
var tabOvervew;
var tblOverview;
var gridJobs;
var lblCountAvailableJobs;
var lblCountPendingJobs;
var lblCountReviewableJobs; 
var lblFooterOverview;   

// tabReview
var gridJobDetails;
var imgPreview;
var tblReview;
var tabReview;
var txtBodyOriginal;
var btnRating1;
var btnRating2;
var btnRating3;
var btnRating4;
var btnRating5;
var tblRadiosRating;
var btnApprove;
var tblApproveActions;
var tblImagePreview;
var txtBodyTranslated;
var lblFooterReview;
//var btnOkReview;

// tabView
var gridJobDetailsView;
var tblView;
var tabView;
var txtBodyOriginalView;
var btnOkView;
var tblViewActions;
//var tblImageView;
var txtBodyTranslatedView;
var lblWarningMachine;
var lblFooterView;

// method that initializes UI controls
function InitComponents() {

    // ----home------
    btnShowSettings = new Ext.Button({
        id: 'btnShowSettings',
        name: 'btnShowSettings',
        text: '<div><p class=\"textSmallButton\">Start</p></div>',
        //cls:'textParnt',
        width: 70,
        height: 30,
        tooltip: 'Log in/Log off',
        renderTo: Ext.get('regionButtons1')
    });
    
    btnShowOrder = new Ext.Button({
        id: 'btnShowOrder',
        name: 'btnShowOrder',
        text: '<div><p class=\"textSmallButton\">Order</p></div>',
        width: 70,
        height: 30,
        disabled: true,
        tooltip: 'New translation',        
        renderTo: Ext.get('regionButtons2')
    });
    
    btnShowOverview = new Ext.Button({
        id: 'btnShowOverview',
        name: 'btnShowOverview',
        text: '<div><p class=\"textSmallButton\">Overview</p></div>',
        width: 70,
        height: 30,
        disabled: true, 
        tooltip: 'Your translations',       
        renderTo: Ext.get('regionButtons3')
        
    });
    
    btnRefresh = new Ext.Button({
        id: 'btnRefresh',
        name: 'btnRefresh',
        text: '',
        width: 18,
        height: 18,
        disabled: true,
        tooltip: 'Refresh your data',
        icon: '~/_wpresources/MiguelRa.spGengo/ext.js/images/yourtheme/grid/refresh.gif',
        renderTo: Ext.get('regionRefresh')
    }); 
    
 //---------------------tab order----------------------        
    btnOrder = new Ext.Button({
       id:'btnOrder',
       name: 'btnOrder',
       ctCls: 'btnOrderAligment',
       text:'<div class="textEmfasize">Order</div>',
       width: 100,
       height:40,
       disabled: true
    });
    
    //********
    /*
     lbPublicKey = new  Ext.form.Label({
       name: 'lbPublicKey',
       id: 'lbPublicKey',
       visible: true,  
       ctCls: 'textParnt',     
       width: 130,
       text: 'Public Key'
   });
    */
    //********
    
    lbTitle = new Ext.form.Label({
     id:'lbTitle',
     name:'lbTitle',
     visible: true,
     text:'Title:',
     ctCls: 'textParnt',
     width: 130,
     x:0,
     y:0
   });
      
    txtJobSlug = new Ext.form.TextField({
        name: 'txtJobSlug',
        id: 'txtJobSlug',
        fieldClass:'textFont',  
        visible: true,
        //cls: 'textKeys',
       // fieldLabel:'Title',
        enableKeyEvents:true,
        //text: ' ',
        width: 420
        //height: 25
    });
   
   lbTier = new Ext.form.Label({
     id:'lbTier',
     name:'lbTier',
     text:'Choose level:',
     ctCls: 'textParnt',
     x:0,
     y:0
   });

   lbStandar = new Ext.form.Label({
     id:'lbStandar',
     name:'lbStandar',
     text:'price',
     ctCls: 'textParnt',
     x:0,
     y:0,
     disabled:true
   });   
   
   lbPro = new Ext.form.Label({
     id:'lbPro',
     name:'lbPro',
     text:'price',
     ctCls: 'textParnt',
     x:0,
     y:0,
     disabled:true
   });

   lbUltra = new Ext.form.Label({
     id:'lbUltra',
     name:'lbUltra',
     text:'price',
     ctCls: 'textParnt',
     x:0,
     y:0,
     disabled:true
   });

   lbMachine = new Ext.form.Label({
     id:'lbMachine',
     name:'lbMachine',
     text:'price',
     ctCls: 'textParnt',
     x:0,
     y:0,
     disabled:true
   });
    
    /*
   rbTierStandar = new Ext.form.Radio({
        name: 'standard',
        id: 'standard',
        checked: true,
        disabled:true       
    });

   rbTierPro = new Ext.form.Radio({
       name:'pro',
       id: 'pro',
       checked: false,
       disabled:true
   });

   rbTierUltra = new Ext.form.Radio({
       name: 'ultra',
       id: 'ultra',
       checked: false,
       disabled:true
   });
   
   rbTierMachine = new Ext.form.Radio({
       name: 'machine',
       id: 'machine',
       checked: false,
       disabled:true
   });
   */
   
   lbFrom = new Ext.form.Label({
     id:'lbFrom',
     name:'lbFrom',
     text:'Translate From:',
     ctCls: 'textParnt',
     x:0,
     y:0,
     disabled:false
   });

   cbLanguage1 = new Ext.form.ComboBox({
       name: 'cbLanguage1',
       id: 'cbLanguage1',       
       fieldLabel: '',
       ctCls: 'cbLanguage1Alignment',        
       //value: 1,
       width: 200,
       height: 25,
       x: 0,
       y: 0,
//       store: storeLanguages,
       mode: 'local',       
       triggerAction: 'all',
       hiddenName: 'combo1',
       displayField:'language',
       valueField: 'lc',
       editable:false,
       disabled:false,
       emptyText: "Select..."

   });  

   lbTo = new Ext.form.Label({
     id:'lbTo',
     name:'lbTo',
     text:'Translate To:',
     ctCls: 'textParnt',
     x:0,
     y:0,
     disabled:false
   });
   
   cbLanguage2 = new Ext.form.ComboBox({
       name: 'cbLanguage2',
       id: 'cbLanguage2',       
       fieldLabel: 'Translate from',   
       ctCls: 'cbLanguage2Alignment',    
       //value: 1,
       width: 200,
       height: 25,
       x: 0,
       y: 0,
//       store: storeLanguages,
       mode: 'local',       
       triggerAction: 'all',
       hiddenName: 'combo1',
       displayField:'language',
       valueField: 'lc',
       editable:false,
       disabled:false,
       emptyText: "Select..."

   }); 

   lbText = new Ext.form.Label({
     id:'textTo',
     name:'textTo',
     text:'Text To Translate',
     ctCls: 'textParnt',
     x:0,
     y:0
   });

   txtTextToTranslate = new Ext.form.TextArea({
       name: 'text',
       id: 'text',
       cls:'textFont',  
       width:350,
       height:470,
       enableKeyEvents:true,
       x: 0,
       y: 0
   });
   
   txtComment = new Ext.form.TextArea({
       name: 'txtComment',
       id: 'txtComment',
       width:425,
       cls:'textFont',  
       height:80,       
       x: 0,
       y: 0
   });  
   
   lblTotalWords = new Ext.form.Label({
       name: 'totalWords',
       id: 'totalWords',
       visible: true,       
       width: 130,  
       cls: 'textParnt',
       ctCls: 'lbOrderWordsAlignment', 
       text: '(0 words)'
   });
   
   lblTotalPrice = new Ext.form.Label({
       name: 'lblTotalPrice',
       id: 'lblTotalPrice',
       visible: true,  
       cls: 'textOrderPrice',
       ctCls: 'lbOrderPriceAlignment',      
       width: 130,
       text: '$0.00'
   });
     
   btnTierStandard = new Ext.Button({
        id: 'btnTierStandard',
        name: 'btnTierStandard',
        text: '<div class="textTier">Standard<br/>$0.05/word</div>',
        disabled: true,
        width: 100,
        height: 60,
        enableToggle: true,
        toggleGroup: "tiers"
       
    });
    
    btnTierPro = new Ext.Button({
        id: 'btnTierPro',
        name: 'btnTierPro',
        text: '<div class="textTier">Pro<br/>$0.10/word</div>',
        disabled: true,
        width: 100,
        height: 60,
        enableToggle: true,
        toggleGroup: "tiers"       
    });
    
    btnTierUltra = new Ext.Button({
        id: 'btnTierUltra',
        name: 'btnTierUltra',
        text: '<div class="textTier">Ultra<br/>$0.15/word</div>',
        disabled: true,
        width: 92,
        height: 60,
        enableToggle: true,
        toggleGroup: "tiers"
        //cls: "textCentered"
//      tooltip:"Professional Translation"
               
    })
    
    btnTierMachine = new Ext.Button({
        id: 'btnTierMachine',
        name: 'btnTierMachine',
        text: '<div class="textTier">Machine<br>Free!</div>',
        disabled: true,
        width: 100,
        height: 60,
        enableToggle: true,
        toggleGroup: "tiers"
    })
      
   // footer
    lblFooterOrder = new Ext.form.Label({
       name: 'lblFooterOrder',
       id: 'lblFooterOrder',
       ctCls:'footerOrder',
       cls:'textFooter',
       visible: true,       
       //width: 130,
       //text: 'Warning: This is a machine pre-translation.',
       html: COPYRIGHT_NOTICE,
       hidden: false
   });
   
   //-------------------Tables-------------------
  
  tblRadios = new Ext.Panel({
    title: '',    
    layout: 'table',
    defaults: {        
        bodyStyle: 'padding:4px'
    },
    layoutConfig: {        
        columns: 4
    },
      items: [ 
              { 
               colspan:4,              
               items:[lbTier]
              },             
              {
               items:[btnTierStandard]       
              },
              {
               items:[btnTierPro]
              },
              {
               items:[btnTierUltra]       
              },
              {
               items:[btnTierMachine]
              },
              {      
               colspan:4,
               items:[{ html: '<a class="tip" href="http://mygengo.com/help/quality_policy" target="_blank"> What do the different levels (Standard, Pro, Ultra) mean? </a>' }  ]
              } 
             ]
    }); 
    
  tblTitle = new Ext.Panel({
        title: '',    
        layout: 'table',
        defaults: {        
            bodyStyle: 'padding:2px'
        },
        layoutConfig: {        
            columns: 1
        },
        items:[{           
                items:[lbTitle] 
               },
               {  
                items:[txtJobSlug]             
               }
              ]
    });   
    
   tblCombos = new Ext.Panel({
        title: '',    
        layout: 'table',
        defaults: {        
            bodyStyle: 'padding:0px'
        },
        layoutConfig: {        
            columns: 2
        },
        items:[{
                width: 210,   
                items:[lbFrom, cbLanguage1]             
               },
               {  
                width: 210,          
                items:[lbTo,cbLanguage2]
               }
              ]
    });
    
    tblTotals = new Ext.Panel({
        title: '',    
        layout: 'table',
        //width: 200,
        defaults: {        
            bodyStyle: 'padding:0px'
        },
        layoutConfig: {        
            columns: 1           
        },
        items:[{                   
                items:[lblTotalWords]             
               },
               {                   
                items:[ lblTotalPrice]             
               }
              ]
    });   

  tblOrder = new Ext.Panel({
    title: '',    
    layout: 'table',
    defaults: {        
        bodyStyle: 'padding:2.8px'
    },
    layoutConfig: {        
        columns: 3
    },
    items: [
            {      
               colspan:3,
               height:HEIGHT_LOADING_PANEL,
               items:[{ html: '<div class=\"loadinAligment\" id=\"loadingPanelOrder\" ></div>' }]
            },    
            {        
            rowspan: 5,
            items:[{ html: '<p class=\"textParnt\"> Your Text: </p>' }, txtTextToTranslate]            
            },
            {      
               colspan:2,
               items:[tblTitle]
               
            }, 
            {
              colspan:2,
              height:50, 
              items: [tblCombos]
            },       
            {      
               colspan:2,
               items:[tblRadios]
            },                       
            {      
               colspan:2,
               items:[{ html: '<p class=\"textParnt\"> (Optional) Add a comment for the translator: </p>' }, txtComment]
            },
            {   
                //colspan:2, 
                items:[tblTotals]               
            },
            {
              //width:270,
               items:[btnOrder]
            },
            {
                colspan: 3,
                items:[lblFooterOrder]
                
            }          
          ]
    }); 
    
   tabOrder = {
       title: 'Order',
       id: 'order',
       autoScroll: true,
       focus: true,
       frame: true,       
       disabled: true,     
       items: [tblOrder]
    };

//----------------tab setting---------------------

   lbPrivateKey = new  Ext.form.Label({
       name: 'lbPrivateKey',
       id: 'lbPrivateKey',
       visible: true,  
       ctCls: 'textParnt',     
       width: 130,
       text: 'Private Key'
   });
   
   lbPublicKey = new  Ext.form.Label({
       name: 'lbPublicKey',
       id: 'lbPublicKey',
       visible: true,  
       ctCls: 'textParnt',     
       width: 130,
       text: 'Public Key'
   });

    txtPrivateKey = new Ext.form.TextField({
        name: 'txtPrivateKey',
        id: 'txtPrivateKey',
        visible: true,
        fieldClass:'textFont', 
        cls: 'textKeys',        
       // fieldLabel: 'Private Key',
        enableKeyEvents:true,
        value: '',
        width: 770,
        height: 25,
        y :20
    });

    txtPublicKey = new Ext.form.TextField({
        name: 'txtPublicKey',
        id: 'txtPublicKey',
        visible: true,
	    fieldClass:'textFont', 
        cls: 'textKeys',
        //fieldLabel:'Public Key',
        enableKeyEvents:true,
        value: '',
        width: 770,
        height: 25
    });
    
    // dumb label where check box Save Session was, for keeping vertical spacing layout
    chbxRemember = new  Ext.form.Label({
       name: 'lbPublicKey',
       id: 'lbPublicKey',
       visible: true,  
       ctCls: 'textParnt',     
       width: 130,
       text: ' '
   });    
    
   /* 
    
    chbxRemember = new Ext.form.Checkbox({
        name: 'remember',
        id: 'remember',
        checked: true,
        hidden: true,
        ctCls:'textParnt',
        cls:'textParnt', 
        itemCls: 'textParnt',
        labelStyle: 'font-family: Verdana, Arial, Helvetica, sans-serif; font-size:14px;',   
        boxLabel: "Save session",
        fieldLabel: "Save session",
        style: 'font-family: Verdana, Arial, Helvetica, sans-serif; font-size:14px;'
                
    });
*/
    btnLogin = new Ext.Button({
        id: 'btnLogin',
        name: 'btnLogin',
        text: '<div><p class=\"textMediumButton\">Log in</p></div>',        
        //disabled: true,
        width: 90,
        height: 30
    });

    btnClearSett = new Ext.Button({
        id: 'btnClearSett',
        name: 'btnClearSett',
        ctCls: 'btnLogin', 
        text: '<div><p class=\"textMediumButton\">Clear</p></div>',
        //disabled: true,
        width: 90,
        height: 30
    });
    
    // footer
    lblFooter = new Ext.form.Label({
       name: 'lblFooter',
       id: 'lblFooter',
       ctCls:'footerSettings',
       cls:'textFooter',
       visible: true,       
       //width: 130,
       //text: 'Warning: This is a machine pre-translation.',
       html: COPYRIGHT_NOTICE,
       hidden: false
   });

    //------------Table Setting-----------------------

    tblButtonsSetting = new Ext.Panel({
        title: '',        
        layout: 'table',
        ctCls:'settingsButttons',
        defaults: {
            bodyStyle: 'padding:2px'
        },
        layoutConfig: {
            columns:3 
        },
        items: [
            {
                    //colspan:2,
                    items:[ { html: '<a class="tip" href="http://mygengo.com/express/account/api_settings/" target="_blank"> Get your own keys on myGengo.com </a>' }]               
               
            },
            {                      
                    items: [btnClearSett]
            },
            {                      
                    items: [btnLogin]
            }
        ]
    });

    tblSetting = new Ext.Panel({
        title: '',        
        layout: 'table',
        defaults: {
            bodyStyle: 'padding:3px'
        },
        layoutConfig: {
            columns:2 
        },
        items: [
                {      
                   colspan:2,
                   width:785,
                   height:HEIGHT_LOADING_PANEL,
                   items:[{ html: '<div class=\"loadinAligment\" id=\"loadingPanelSettings\" ></div>' }]
                },
                {
                    colspan: 2,
                    items: [{ html: '<p class=\"textParnt\"> <div id="lblPublicKey1" class=\"textParnt\"> Public Key </div> </p>' }, txtPublicKey]
                },
                {                
                    colspan:2,
                    items: [{ html: '<p class=\"textParnt\"> <div id="lblPrivateKey1" class=\"textParnt\"> Private Key </div> </p>' }, txtPrivateKey]
                },                
                {
                    colspan: 2,
                    width:250,
                    items: [chbxRemember]
                },
                {   
                    colspan: 2,                  
                    items: [tblButtonsSetting]
                },
                {  
                    colspan: 2,                    
                    height:373,                  
                    items: [lblFooter]
                }
                
                
                /*                
                {                   
                    items: [btnClearSett],
                    cellCls: 'highlight'
                },
                {                      
                    items: [btnLogin]
                   // cellCls: 'highlight'
                }*/
               ]
    });          

    tabSetting = new Array({
        title: 'Start',
        id: 'setting',
        autoScroll: true,
        focus: true,
        frame: true,        
        items:[tblSetting]
    });  

//-----------------tab overview------------------------

    // gridJobs    
    // * fake jsonStore to initialize gridJobs
    var jsonStrJobs = '{"opstat":"ok","response":[{"job_id":"--","slug":"--","body_src":"--","lc_src":"--","lc_tgt":"--","unit_count":"--","tier":"--","credits":"--","status":"--","eta":"--","ctime":"--","callback_url":"--","auto_approve":"--","custom_data":"--"}]}';    
	var jsonDataJobs = Ext.util.JSON.decode(jsonStrJobs);
	var storeJobs = new Ext.data.JsonStore({
			data: jsonDataJobs,
			root: 'response',
			id: 'job_id',
			fields: ['job_id', 'slug', 'tier', 'lc_src', 'lc_tgt', 'status', 'unit_count', 'credits', 'ctime']
		});
	
	// custom renderer for timestamp date column	
	function myDateRenderer(value, metadata, record, rowIndex, colIndex, store)
	{	 
	    // timestamp come in seconds. We have to multiply by 1000 to get milliseconds. 	    
	    var date = new Date(value * 1000);
	    var date_str = date.toDateString();
	    //date_str = value;
	    var content = "<div class=\"overview_credits\">" + record.get('credits') + ' credits' + "</div>" +  "<div class=\"overview_date\">" + date_str + "</div>";
	    	    
	    return content;
	}	
	
	// custom renderer for column slug-languages-words
	function myXRenderer(value, metadata, record, rowIndex, colIndex, store)
	{          
	    var slug = value;	       
	    var words = record.get('unit_count');
	    
	    // get languages
	    var language_src = getLanguageByCulture(record.get('lc_src'));
	    var language_tgt = getLanguageByCulture(record.get('lc_tgt'));
	    var languages = language_src + ' > ' + language_tgt;
//	    var languages = record.get('lc_src') + ' > ' + record.get('lc_tgt');	    
	    
	    // concat
	    var content = "<div class=\"overview_slug\">" + slug + "</div>" + "<div class=\"overview_languages\">" +languages + "</div>" + "<div class=\"overview_words\">" + words + " words" + "</div>";    
	    
	    return content;
	}
	
	// custom renderer for tier column	
	function myTierRenderer(value, metadata, record, rowIndex, colIndex, store)
	{	 
	    var imgSrc;	    
	    if(value == 'standard')
	        imgSrc = getUrl('images/mygengo_standard_medium.png');
	    else if(value == 'pro')
	        imgSrc = getUrl('images/mygengo_pro_medium.png');
	    else if(value == 'ultra' || value == 'ultra_pro')
	        imgSrc = getUrl('images/mygengo_ultra_medium.png');
	    else if(value == 'machine')
	        imgSrc = getUrl('images/mygengo_machine_medium.png');
	    else
	        imgSrc = getUrl('images/mygengo_unknown_medium.png');
	        
	    var imgTag = "<img src=" + imgSrc + " />";
	    imgTag += "<br /><br />";
	    
	    return imgTag;

	}	
	
	// custom renderer for job # column	
	function myJobNumberRenderer(value, metadata, record, rowIndex, colIndex, store)
	{	   
	    var content = "<div class=\"overview_jobNumber\">" +  'Job #' + "<br />" + value + "</div>";	    	    
	    return content;
	}
		
	// custom renderer for action-buttons column	
	function myButtonRenderer(value, metadata, record, rowIndex, colIndex, store)
	{   
	    // build btnView container
	    var containerBtnView = document.createElement("div");
		containerBtnView.id = "containerBtnView" + record.get('job_id');		
        
        // build btnReview container
	    var containerBtnReview = document.createElement("div");
		containerBtnReview.id = "containerBtnReview" + record.get('job_id');	
        
        // build btnCancel container
	    var containerBtnCancel = document.createElement("div");
		containerBtnCancel.id = "containerBtnCancel" + record.get('job_id');	
	    
	    // build html for action buttons
	    var content = "<table align=\"right\"><tr><td width=\"61\">" + containerBtnView.outerHTML + "</td><td width=\"61\">" 	    
	    + containerBtnReview.outerHTML + "</td><td width=\"61\">" + containerBtnCancel.outerHTML + "</td></tr></table>";	    
	    	    
	    return content;
	    
	}
	
	// custom renderer for status column
	function myStatusRenderer(value, metadata, record, rowIndex, colIndex, store)
	{	
//	    alert('setting status of job in grid: ' + 'row:' + rowIndex + ', job:' + record.get('job_id') + ', status:' + value);
	    var status;
	    if(value == JOB_STATUS_AVAILABLE)
	        status = JOB_STATUS_AVAILABLE_FRIENDLY;
	    else if(value == JOB_STATUS_PENDING)
	        status = JOB_STATUS_PENDING_FRIENDLY;
	    else if(value == JOB_STATUS_REVIEWABLE)
	        status = JOB_STATUS_REVIEWABLE_FRIENDLY;
	    else if(value == JOB_STATUS_APPROVED)	    
	        status = JOB_STATUS_APPROVED_FRIENDLY;	    
	    else if(value == JOB_STATUS_CANCELLED)
	        status = JOB_STATUS_CANCELLED_FRIENDLY;
	    else if(value == JOB_STATUS_REVISING)
	        status = JOB_STATUS_REVISING_FRIENDLY;
	    else if(value == JOB_STATUS_HELD)
	        status = JOB_STATUS_HELD_FRIENDLY;          
	    else
	        status = value;
	   
	    var content = "<div class=\"overview_status\">" + status + "</div>";
	    return content;
	    
	}	
	
	//**************	
	// gridPanel for Jobs
	gridJobs = new Ext.grid.GridPanel({
		store: storeJobs,
		columns: [
		    {id:'tier', width: 105, renderer: myTierRenderer, dataIndex: 'tier'},
			{id:'job_id', width: 70, hidden: true, renderer: myJobNumberRenderer, dataIndex: 'job_id'},
			{id:'job_title', width: 250, renderer: myXRenderer, dataIndex: 'slug'},			
			{id:'credits', width: 130, renderer: myDateRenderer, dataIndex: 'ctime'},
			{id:'status', renderer: myStatusRenderer, width: 75, dataIndex: 'status'},
			{id:'actions', width: 210, renderer: myButtonRenderer}
		],
		viewConfig: {
			forceFit: false
		},
		//sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
		//width:770,
		//height:500,
		frame:false,
		iconCls:'icon-grid',
		disableSelection: true,
		cls: 'normalText',
		ctCls:'gridJobs',
		header: false,
		autoHeight: true,
		maxHeight: 463,
		//hideHeaders: true,
		enableHdMenu: false // header menu
		//autoExpandColumn: 'ctime'
		
	});
	
	//**************
	/* Simple Table approach
	// gridPanel for Jobs		
	gridJobs = new Ext.grid.GridPanel({
		store: storeJobs,
		columns: [
		    {header: "Tier", width: 70, dataIndex: 'tier'},
			{header: "Job #", id:'job_id', width: 45, dataIndex: 'job_id'},					
			{header: "Slug", width: 110, dataIndex: 'slug'},
			{header: "Credits", width: 60, dataIndex: 'credits'},
			{header: "Words", width: 45, dataIndex: 'unit_count'},
			{header: "Status", width: 70, dataIndex: 'status'},
			{header: "From", width: 110, dataIndex: 'lc_src'},
			{header: "To", width: 110, dataIndex: 'lc_tgt'},
			{header: "Ordered", renderer: myDateRenderer, dataIndex: 'ctime'}		
			
		],
		viewConfig: {
			forceFit: true
		},
		sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
		width:770,
		//height:300,
		frame:false,
		iconCls:'icon-grid'	
		//autoExpandColumn: 'ctime'
	});
    */
    
    
    
   lblCountAvailableJobs = new Ext.form.Label({
       name: 'availableJobs',
       id: 'availableJobs',
       visible: true,       
       //width: 130,
       text: '0 available',
       hidden: true
   });
   
    lblCountPendingJobs = new Ext.form.Label({
       name: 'pendingJobs',
       id: 'pendingJobs',
       visible: true,       
       //width: 130,
       text: '0 pending',
       hidden: true
   });
   
    lblCountReviewableJobs = new Ext.form.Label({
       name: 'reviewableJobs',
       id: 'reviewableJobs',
       visible: true,       
       //width: 130,
       text: '0 reviewable',
       hidden: true
   });
   
   lblFooterOverview = new Ext.form.Label({
       name: 'lblFooterOverview',
       id: 'lblFooterOverview',
       ctCls:'footerOverview',
       cls:'textFooter',
       visible: true,       
       //width: 130,      
       html: COPYRIGHT_NOTICE,
       hidden: false
   });
       
    // table
    tblOverview = new Ext.Panel({
        title: '',
        layout: 'table',
        defaults: {
            bodyStyle: 'padding:2px'
        },
        layoutConfig: {
            columns: 3
        },
        items: [
                {      
                   colspan:3,                   
                   width:785,
                   height:HEIGHT_LOADING_PANEL,
                   items:[{ html: '<div class=\"loadinAligment\" id=\"loadingPanelOverview\"></div>' }]
                },
                {
                    colspan:3,
                    items: [lblCountAvailableJobs, lblCountPendingJobs, lblCountReviewableJobs]
                },
                {                
                    colspan:3,
                    height:463,
                    items: [gridJobs]
                },               
                {
                    colspan: 3,                    
                    height:70,                  
                    items: [lblFooterOverview]
                    
                }
               ]
    });
    
    // tab
    tabOvervew = new Array({
        title: 'Overview',
        id: 'overvew',
        autoScroll: true,
        focus: true,
        defaults: { anchor: '-20' },
        frame: true,
        disabled: true,
        items:[tblOverview]
    });

//-----------------tab Review------------------------

   // fake jsonStore to initialize gridJobDetails
    var jsonStrJobs2 = '{"opstat":"ok","response":[{"job_id":"--","slug":"--","body_src":"--","lc_src":"--","lc_tgt":"--","unit_count":"--","tier":"--","credits":"--","status":"--","eta":"--","ctime":"--","callback_url":"--","auto_approve":"--","custom_data":"--"}]}';    
	var jsonDataJobs2 = Ext.util.JSON.decode(jsonStrJobs);
	var storeJobs2 = new Ext.data.JsonStore({
			data: jsonDataJobs,
			root: 'response',
			fields: ['job_id', 'slug', 'tier', 'lc_src', 'lc_tgt', 'status', 'unit_count', 'credits', 'ctime']
		});

  //gridJobDetails 
  gridJobDetails = new Ext.grid.GridPanel({
		store: storeJobs2,
		columns: [
		    {id:'tier', width: 120, renderer: myTierRenderer, dataIndex: 'tier'},
			{id:'job_id', width: 80, renderer: myJobNumberRenderer, dataIndex: 'job_id'},
			{id:'job_title', width: 330, renderer: myXRenderer, dataIndex: 'slug'},			
			{id:'credits', width: 150, renderer: myDateRenderer, dataIndex: 'ctime'},
			{id:'status', renderer: myStatusRenderer, width: 100, dataIndex: 'status'}			
		],
		viewConfig: {
			forceFit: false
		},
		//sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
		width:780,
		//height:500,
		frame:false,
		iconCls:'icon-grid',
		disableSelection: true,
		cls: 'normalText',
		header: false,
		autoHeight: true,
		maxHeight: 500,
		//hideHeaders: true,
		enableHdMenu: false // header menu
		//autoExpandColumn: 'ctime'
		
	});

  // txtBodyOriginal  
  txtBodyOriginal = new Ext.form.TextArea({
        name: 'txtBodyOriginal',
        id: 'txtBodyOriginal',
        visible: true,
        ctCls:'listAligment',
        cls:'textFont',
        fieldLabel:'Body',
        emptyText: 'Original Text',
        readOnly: true,
        enableKeyEvents:true,
        //text: ' ',
        width: 780,
        height: 130
    }); 
    
 // txtBodyTranslated
 // * it is build on demand at run-time.
 /* 
  txtBodyTranslated = new Ext.form.TextArea({
        name: 'txtBodyTranslated',
        id: 'txtBodyTranslated',
        visible: true,
        fieldLabel:'Translation',
        emptyText: 'Translation',
        readOnly: true,
        enableKeyEvents:true,
        //text: ' ',
        width: 695,
        height: 150
    });      
  */
    
  // btnRating1
  btnRating1 = new Ext.Button({
        id: 'btnRating1',
        name: 'btnRating1',
        text: '1',        
        width: 20,
        height: 20,
        enableToggle: true,
        toggleGroup: "rating"
  });
    
  // btnRating2
  btnRating2 = new Ext.Button({
        id: 'btnRating2',
        name: 'btnRating2',
        text: '2',        
        width: 20,
        height: 20,
        enableToggle: true,
        toggleGroup: "rating"       
    });
    
  // btnRating3
  btnRating3 = new Ext.Button({
        id: 'btnRating3',
        name: 'btnRating3',
        text: '3',        
        width: 20,
        height: 20,
        enableToggle: true,
        toggleGroup: "rating"       
    });
    
  // btnRating4
  btnRating4 = new Ext.Button({
        id: 'btnRating4',
        name: 'btnRating4',
        text: '4',        
        width: 20,
        height: 20,
        enableToggle: true,
        toggleGroup: "rating"       
    });
    
  // btnRating5
  btnRating5 = new Ext.Button({
        id: 'btnRating5',
        name: 'btnRating5',
        text: '5',        
        width: 20,
        height: 20,
        enableToggle: true,
        toggleGroup: "rating"       
    });
    
 // btnApprove
  btnApprove = new Ext.Button({
        id: 'btnApprove',
        name: 'btnApprove',
        text: '<div class="textEmfasize">Approve</div>', 
        //ctCls:'btnAproveAligment',       
        width: 100,
        height:40
    });
  /*  
   // btnClose
  btnOkReview = new Ext.Button({
        id: 'btnOkReview',
        name: 'btnOkReview',
        text: '<div>Done</div>',        
        width: 90,
        height:30
    });
 
  */
  
  // footer
  lblFooterReview = new Ext.form.Label({
       name: 'lblFooterReview',
       id: 'lblFooterReview',
       ctCls:'footerReview',
       cls:'textFooter',
       visible: true,       
       //width: 130,
       //text: 'Warning: This is a machine pre-translation.',
       html: COPYRIGHT_NOTICE,
       hidden: false
   });  
  
  // table Rating  
  
  var tblRating= new Ext.Panel({
    title: '',    
    layout: 'table',
    defaults: {        
        bodyStyle: 'padding:2px'
    },
    layoutConfig: {        
        columns: 5
    },
      items: [{                           
               items:[btnRating1]
              },
              {                           
               items:[btnRating2]
              },
              {                           
               items:[btnRating3]
              },
              {                           
               items:[btnRating4]
              },
              {                           
               items:[btnRating5]
              } ]
      });
  var lbOptional = new Ext.form.Label({
       name: 'lbOptional',
       id: 'lbOptional',
       visible: true,       
       //width: 130,
       text: '(Optional) Please rate the translation:',
       ctCls:'listAligment',
       cls:'textParnt'
       //hidden: true
   });
  
  tblRadiosRating = new Ext.Panel({
    title: '',    
    layout: 'table',
    defaults: {        
        bodyStyle: 'padding:5px'
    },
    layoutConfig: {        
        columns: 4
    },
      items: [ 
              {  
                
               //colspan:3,                           
                items: [lbOptional]  
              },  
              {  
                items: [{ html: '<p class=\"textParnt\"> Bad </p>' }]  
              },
              {                           
               items:[tblRating]
              },              
              {  
                items: [{ html: '<p class=\"textParnt\"> Great </p>' }]  
              }
             ]
    });
    
 //tblBtnActions
 tblApproveActions = new Ext.Panel({
    title: '',    
    layout: 'table',
    ctCls:'pnAprove',
    defaults: {        
        bodyStyle: 'padding:1.5px'
    },
    layoutConfig: {        
        columns: 5
    },
      items: [                 
                {                    
                    items: [{ html: '<div id="linkRejectJob" class=\"textParnt\"> <a href="#" class=\"textParnt\"> Reject </a> </div>' }]
                },
                {                    
                    items: [{ html: ' | ' }]  
                },
                {                    
                    items: [{ html: '<div id="linkCorrectJob" class=\"textParnt\"> <a href="#" class=\"textParnt\"> Request correction </a> </div>' }]
                },
                {    
                    width:150,              
                    items: [btnApprove]
                }/*,
		{                    
                    items: [btnOkReview]
                } */
             ]
    });  
  
  // tblImagePreview  
  tblImagePreview = new Ext.Panel({
        title: '',
        width:780,
        height: 150,
        autoScroll: true,
        ctCls:'pnImagePreview',
        cls:'pnImagePreview',
        layout: 'table',
        defaults: {
            bodyStyle: 'padding:2px'
        },       
        layoutConfig: {
            columns: 1
        },
        items: [
                {                    
                    items: [{ html: '<div class=\"pnImagePreview\" id="imgPreview"><img src="~/_wpresources/MiguelRa.spGengo/spGengo/images/translationPreview.jpg" /></div>' }]
                }
               ]
    });

  // table
  tblReview = new Ext.Panel({
        title: '',        
        layout: 'table',
        defaults: {
            bodyStyle: 'padding:2px'
        },
        layoutConfig: {
            columns: 1
        },
        items: [
                {      
                   colspan:1,
                   width:785,
                   height:HEIGHT_LOADING_PANEL,
                   items:[{ html: '<div class=\"loadinAligment\" id=\"loadingPanelReview\"></div>' }]
                },                
                {                
                    //colspan:3,
                    items: [gridJobDetails]
                },
                {                    
                    items: [{ html: '<p class=\"textParnt\"> Original text <span id=\"previewLanguageSrc\" class=\"textParnt\" >Chinese (Simplified) </span> <span id=\"loadingPreviewText\" > </span> </p>' }, txtBodyOriginal]
                },
                {  
                                     
                    items: [{ html: '<p class=\"textParnt\"> <span class=\"textParnt\" id=\"lblTranslatedText\" > Translation preview </span> <span id=\"previewLanguageTgt\" class=\"textParnt\" >Chinese (Simplified)</span> <span id=\"loadingPreviewImage\" > </span> </p> ' }/*, imgPreview*/]
                },
                {                  
                    items: [tblImagePreview]
                },                                              
                {                  
                    items: [tblRadiosRating]
                },
                {   
                    width:785,               
                    items: [tblApproveActions]
                },
                {                  
                    //height:200,                 
                    items: [lblFooterReview]                   
                }
                                            
               ]
    });
    

 // tab
 tabReview = new Array({
        title: 'Review',
        id: 'review',
        autoScroll: true,
        focus: true,
        defaults: { anchor: '-20' },
        frame: true,
        disabled: true,
//        hidden: true,
        items:[tblReview]
    }); 


//-----------------tab View------------------------

   // fake jsonStore to initialize gridJobDetails
    var jsonStrJobs3 = '{"opstat":"ok","response":[{"job_id":"--","slug":"--","body_src":"--","lc_src":"--","lc_tgt":"--","unit_count":"--","tier":"--","credits":"--","status":"--","eta":"--","ctime":"--","callback_url":"--","auto_approve":"--","custom_data":"--"}]}';    
	var jsonDataJobs3 = Ext.util.JSON.decode(jsonStrJobs3);
	var storeJobs3 = new Ext.data.JsonStore({
			data: jsonDataJobs3,
			root: 'response',
			fields: ['job_id', 'slug', 'tier', 'lc_src', 'lc_tgt', 'status', 'unit_count', 'credits', 'ctime']
	});

  //gridJobDetails  
  gridJobDetailsView = new Ext.grid.GridPanel({
		store: storeJobs3,
		columns: [
		    {id:'tier', width: 120, renderer: myTierRenderer, dataIndex: 'tier'},
			{id:'job_id', width: 80, renderer: myJobNumberRenderer, dataIndex: 'job_id'},
			{id:'job_title', width: 330, renderer: myXRenderer, dataIndex: 'slug'},			
			{id:'credits', width: 150, renderer: myDateRenderer, dataIndex: 'ctime'},
			{id:'status', renderer: myStatusRenderer, width: 100, dataIndex: 'status'}
		],
		viewConfig: {
			forceFit: false
		},
		//sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
		width:780,
		//height:500,
		frame:false,
		iconCls:'icon-grid',
		disableSelection: true,
		cls: 'normalText',
		header: false,
		autoHeight: true,
		maxHeight: 500,
		//hideHeaders: true,
		enableHdMenu: false // header menu
		//autoExpandColumn: 'ctime'
		
	});

  // txtBodyOriginal  
  txtBodyOriginalView = new Ext.form.TextArea({
        name: 'txtBodyOriginalView',
        id: 'txtBodyOriginalView',
        visible: true,
        fieldLabel:'Body',
        emptyText: 'Original Text',
        readOnly: true,
        cls:'textFont',
        ctCls:'listAligment',
        enableKeyEvents:true,
        //text: ' ',
        width: 780,
        height: 150
    });
    
 // txtBodyTranslated  
  txtBodyTranslatedView = new Ext.form.TextArea({
        name: 'txtBodyTranslatedView',
        id: 'txtBodyTranslatedView',
        visible: true,
        cls:'textFont',
        fieldLabel:'Translation',
        emptyText: 'Translation',
        readOnly: true,
        ctCls:'listAligment',
        enableKeyEvents:true,
        //text: ' ',
        width: 780,
        height: 150
    });
    
 // lblWarningMachine
 lblWarningMachine = new Ext.form.Label({
       name: 'lblWarningMachine',
       id: 'lblWarningMachine',
       ctCls:'labelWarningMachine',
       cls:'textWarning',
       visible: true,       
       //width: 130,
       //text: 'Warning: This is a machine pre-translation.',
       html: ' <img class="imageFooter" width="16" height="16" src="~/_wpresources/MiguelRa.spGengo/spGengo/images/machine_mini.gif" /> Warning: This is a machine pre-translation.',
       hidden: false
   });
    
 // btnClose
  btnOkView = new Ext.Button({
        id: 'btnOkView',
        name: 'btnOkView',
        ctCls:'btnViewOk',        
        text: '<div class=\"textMediumButton\">Done</div>',
        width: 90,
        height:30
    });
 
  // footer
  lblFooterView = new Ext.form.Label({
       name: 'lblFooterView',
       id: 'lblFooterView',
       ctCls:'footerView',
       cls:'textFooter',
       visible: true,       
       //width: 130,
       //text: 'Warning: This is a machine pre-translation.',
       html: COPYRIGHT_NOTICE,
       hidden: false
   });   
    
 //tblBtnActions
 tblViewActions = new Ext.Panel({
    title: '',    
    layout: 'form',
    defaults: {        
        bodyStyle: 'padding:1.2px'
    },
    /*layoutConfig: {        
        columns: 1
    },*/
      items: [ 
                {  
                 //width:750,               
                    items: [btnOkView]
                }
             ]
    }); 
    
  // tblView  
  tblView = new Ext.Panel({
        title: '',        
        layout: 'table',
        defaults: {
            bodyStyle: 'padding:3px'
        },
        layoutConfig: {
            columns: 1
        },
        items: [
                {      
                   colspan:1,
                   width:785,
                   height:HEIGHT_LOADING_PANEL,
                   items:[{ html: '<div class=\"loadinAligment\" id=\"loadingPanelView\"></div>' }]
                },
                {                
                    //colspan:3,
                    items: [gridJobDetailsView]
                },                
                {                    
                    items: [{ html: '<p class=\"textParnt\"> Original text <span id=\"previewLanguageSrcView\" >Chinese (Simplified)</span> <span id=\"loadingPreviewTextView\" > </span> </p>' }, txtBodyOriginalView]
                },
                {  
                                     
                    items: [{ html: '<p class=\"textParnt\"> Translated text <span id=\"previewLanguageTgtView\" >Chinese (Simplified)</span> <span id=\"loadingPreviewImageView\" > </span> </p> ' }, txtBodyTranslatedView]
                },
                {                  
                    items: [lblWarningMachine]
                },              
                {                  
                    items: [tblViewActions]
                }
                ,              
                { 
                    height:50,                 
                    items: [lblFooterView]
                }
               
                                            
               ] 
    });
    

 // tab
 tabView = new Array({
        title: 'View',
        id: 'view',
        autoScroll: true,
        focus: true,
        defaults: { anchor: '-20' },
        frame: true,
        disabled: false,
        items:[tblView]
    });  

//-----------window init------------------------------
   tabControl = new Ext.TabPanel({
        autoScroll: true,
        activeTab: 0,
        border: false,
        anchor: '100% 100%',
        deferredRender: false,
        items: [tabSetting, tabOrder, tabOvervew, tabReview, tabView]
    });

    wdMain = new Ext.Window({
        title: 'spGengo - Human Translation within SharePoint sites.',
        modal: false,
        width: 810,        
        height: 620,
        resizable: false,
        border: false,
        closeAction: 'hide',
        layout: 'fit',
        items:[tabControl]
    });
    
} //end of InitComponents finction

function ShowDialog(activeTab)
{   
    tabControl.setActiveTab(activeTab);
	wdMain.show(wdMain);
}
