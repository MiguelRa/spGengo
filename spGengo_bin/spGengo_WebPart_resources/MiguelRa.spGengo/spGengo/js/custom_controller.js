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
Controller code.
Tasks:ils
- Build UI
- Handle UI events.
- Handle AJAX events.
- Handle errors.
*/

//*** global variables ***
var languageList;
var languagePairs;
var jsonLanguages;
var tierPrice = 0;
var selectedJobRecord;
var cookieProvider = '';
var globalOperation = '';

//*** onLoad actions ****
Ext.onReady(function(){  
    
    // build UI
    InitComponents();        
    
    // show tabViewReview
    showTabViewReview();
    
    // init tool tips
    Ext.QuickTips.init();
    
    // set credits label
    document.getElementById("credits").innerHTML = '<div class="textCredits">' + TEXT_UI_YOUR_CREDITS + ': ' + '<span class="numberCredits">' + '---' + '</span></div>';
    document.getElementById("logo").innerHTML = '<img src=\"~/_wpresources/MiguelRa.spGengo/spGengo/images/logo.gif\">';
           
    // set UI event handlers
    SetEventHandlers();
       
    // set global ajax handlers
    Ext.Ajax.timeout = TIMEOUT;
    
    // * onRequest: show loading
    Ext.Ajax.on('beforerequest', function(connection,options){
        // show loading
        var loading = Ext.get("loadingPanel");
        loading.dom.innerHTML = "<img src=\"~/_wpresources/MiguelRa.spGengo/ext.js/images/default/shared/loading-balls.gif\">"; 
        
        // show loading in tabs
        if(tabControl.rendered)
        { 
            Ext.get("loadingPanelOrder").dom.innerHTML = "<img src=\"~/_wpresources/MiguelRa.spGengo/ext.js/images/default/shared/loading-balls.gif\">";
            Ext.get("loadingPanelSettings").dom.innerHTML = "<img src=\"~/_wpresources/MiguelRa.spGengo/ext.js/images/default/shared/loading-balls.gif\">";
            Ext.get("loadingPanelOverview").dom.innerHTML = "<img src=\"~/_wpresources/MiguelRa.spGengo/ext.js/images/default/shared/loading-balls.gif\">";        
            Ext.get("loadingPanelReview").dom.innerHTML = "<img src=\"~/_wpresources/MiguelRa.spGengo/ext.js/images/default/shared/loading-balls.gif\">";
            Ext.get("loadingPanelView").dom.innerHTML = "<img src=\"~/_wpresources/MiguelRa.spGengo/ext.js/images/default/shared/loading-balls.gif\">";
        }          

    });

    // * onResponse: hide loading
    Ext.Ajax.on('requestcomplete', function(connection,options){
       // hide loading 
        var loading = Ext.get("loadingPanel");
        loading.dom.innerHTML = "";
        
        // show loading in tabs
        if(tabControl.rendered)
        {
            Ext.get("loadingPanelOrder").dom.innerHTML = "";
            Ext.get("loadingPanelSettings").dom.innerHTML = "";
            Ext.get("loadingPanelOverview").dom.innerHTML = "";
            Ext.get("loadingPanelReview").dom.innerHTML = "";
            Ext.get("loadingPanelView").dom.innerHTML = "";
        }
        
         // hide loading
        notify("", "");

    });

    // * onError: hide loading
    Ext.Ajax.on('requestexception', function(connection, result, options){
        // hide loading
        var loading = Ext.get("loadingPanel");
        loading.dom.innerHTML = "";
        
        // show loading in tabs
        if(tabControl.rendered)
        {
             Ext.get("loadingPanelOrder").dom.innerHTML = "";
             Ext.get("loadingPanelSettings").dom.innerHTML = "";
             Ext.get("loadingPanelOverview").dom.innerHTML = "";
             Ext.get("loadingPanelReview").dom.innerHTML = "";
             Ext.get("loadingPanelView").dom.innerHTML = "";
             
        }        
        
        // show error
        notifyWithDetails(TEXT_ERROR_TYPE_CONNECTION, TEXT_ERROR_MESSAGE_CONNECTION, 'URL: ' + options.url + '<br />' + 'HTTP Code: ' + result.status + '<br />' + 'Message: ' + result.statusText, "error");
 
    });
    
    // check for keys in cookies, initialize app if founded
   var cookieProvider = getCookieProvider();
   var privateKey = cookieProvider.get("privateKey", "");
   var publicKey = cookieProvider.get("publicKey", "");   
   if(privateKey != "" && publicKey != "")
   {
        var saveKeys = false;
        login(privateKey, publicKey, saveKeys);
        
        // render window so job actions can be added dinamycally
        wdMain.show(wdMain);
        wdMain.hide();
   }
    
});

//*** Utils ****
function getCookieProvider()
{
    if(cookieProvider == '')
    {
        cookieProvider = new Ext.state.CookieProvider({       
            expires: new Date(new Date().getTime()+(1000*60*60*24*30)) //30 days       
        });
        Ext.state.Manager.setProvider(cookieProvider);
    }
    
    return cookieProvider;
}

function arrayContainsElement(array, element)
{
    if(array == null)
        return;

    var founded = false;
    for(var i = 0; i < array.length; i++)
    {
        if(array[i] == element)
        {
            founded = true;
            break;
        }
    }
    
    return founded;
}

function showMessageError(title, message)
{
   Ext.Msg.show({  
        title: title,
        msg: message, 
        buttons: Ext.Msg.OK, 
        icon: Ext.Msg.ERROR
     }); 
     
}

function showMessageInfo(title, message)
{  
   Ext.Msg.show({  
        title: title,
        msg: message, 
        buttons: Ext.Msg.OK, 
        icon: Ext.Msg.INFO,
        modal: true
     });
     
}

/*
Displays a message to the user.
@message: Text to be displayed.
@type: "info" or "error".
*/
function notify(message, type)
{ 
    var notificationPanel = Ext.get("loadingPanel");
       
    // if no message, clear notification panel
    if(message == "")
    {   
        notificationPanel.dom.innerHTML = "";

        if(tabControl.rendered)
        {
             Ext.get("loadingPanelOrder").dom.innerHTML = "";
             Ext.get("loadingPanelSettings").dom.innerHTML = "";
             Ext.get("loadingPanelOverview").dom.innerHTML = "";
             Ext.get("loadingPanelReview").dom.innerHTML = "";
             Ext.get("loadingPanelView").dom.innerHTML = "";
             
        }
        return;
    }   
    
   // change style according to message type    
   if(type == "info")  {    
      notificationPanel.dom.className = "infoPanel";
	if(tabControl.rendered)
        {
             Ext.get("loadingPanelOrder").dom.className = "infoPanel";
             Ext.get("loadingPanelSettings").dom.className = "infoPanel";
             Ext.get("loadingPanelOverview").dom.className = "infoPanel";
             Ext.get("loadingPanelReview").dom.className = "infoPanel";
             Ext.get("loadingPanelView").dom.className = "infoPanel";
             
        } 
 } 
   else if(type == "error") {
      notificationPanel.dom.className = "errorPanel";
	if(tabControl.rendered)
        {
             Ext.get("loadingPanelOrder").dom.className = "errorPanel";
             Ext.get("loadingPanelSettings").dom.className = "errorPanel";
             Ext.get("loadingPanelOverview").dom.className = "errorPanel";
             Ext.get("loadingPanelReview").dom.className = "errorPanel";
             Ext.get("loadingPanelView").dom.className = "errorPanel";
             
        }
 }
   
   // show message
    notificationPanel.dom.innerHTML = message;
  if(tabControl.rendered)
        {
             Ext.get("loadingPanelOrder").dom.innerHTML = message;
             Ext.get("loadingPanelSettings").dom.innerHTML =  message;
             Ext.get("loadingPanelOverview").dom.innerHTML =  message;
             Ext.get("loadingPanelReview").dom.innerHTML =  message;
             Ext.get("loadingPanelView").dom.innerHTML =  message;
             
        } 
  
}

function notifyWithDetails(errorTitle, message, details, type)
{ 
    var notificationPanel = Ext.get("loadingPanel");
       
    // if no message, clear notification panel
    if(message == "")
    {   
        notificationPanel.dom.innerHTML = ""; 
 	if(tabControl.rendered)
        {
             Ext.get("loadingPanelOrder").dom.innerHTML = "";
             Ext.get("loadingPanelSettings").dom.innerHTML =  "";
             Ext.get("loadingPanelOverview").dom.innerHTML =  "";
             Ext.get("loadingPanelReview").dom.innerHTML =  "";
             Ext.get("loadingPanelView").dom.innerHTML =  "";
             
        }       
        return;
    }   
    
   // change style according to message type    
   if(type == "info")    {   
      notificationPanel.dom.className = "infoPanel"; 
	if(tabControl.rendered)
        {
             Ext.get("loadingPanelOrder").dom.className = "infoPanel";
             Ext.get("loadingPanelSettings").dom.className = "infoPanel";
             Ext.get("loadingPanelOverview").dom.className = "infoPanel";
             Ext.get("loadingPanelReview").dom.className = "infoPanel";
             Ext.get("loadingPanelView").dom.className = "infoPanel";
             
        }
}
   else if(type == "error"){
      notificationPanel.dom.className = "errorPanel";
	if(tabControl.rendered)
        {
             Ext.get("loadingPanelOrder").dom.className = "errorPanel";
             Ext.get("loadingPanelSettings").dom.className = "errorPanel";
             Ext.get("loadingPanelOverview").dom.className = "errorPanel";
             Ext.get("loadingPanelReview").dom.className = "errorPanel";
             Ext.get("loadingPanelView").dom.className = "errorPanel";
             
        }
}
       
   // show message
   if((Ext.util.Format.undef(details) != "") && DEBUG)
   { 
       var myDetails = errorTitle + ': ' + message + '<br />' + details;
       notificationPanel.dom.innerHTML = message + '<a href="#" onclick="showMessageError(\'Error details\', \'' + myDetails + '\')">[...]</a>';         
   	if(tabControl.rendered)
        {
             Ext.get("loadingPanelOrder").dom.innerHTML = message + '<a href="#" onclick="showMessageError(\'Error details\', \'' + myDetails + '\')">[...]</a>';
             Ext.get("loadingPanelSettings").dom.innerHTML =  message + '<a href="#" onclick="showMessageError(\'Error details\', \'' + myDetails + '\')">[...]</a>';
             Ext.get("loadingPanelOverview").dom.innerHTML =  message + '<a href="#" onclick="showMessageError(\'Error details\', \'' + myDetails + '\')">[...]</a>';
             Ext.get("loadingPanelReview").dom.innerHTML =  message + '<a href="#" onclick="showMessageError(\'Error details\', \'' + myDetails + '\')">[...]</a>';
             Ext.get("loadingPanelView").dom.innerHTML =  message + '<a href="#" onclick="showMessageError(\'Error details\', \'' + myDetails + '\')">[...]</a>';
             
        }
}
   else
{
        notificationPanel.dom.innerHTML = message;
	if(tabControl.rendered)
        {
             Ext.get("loadingPanelOrder").dom.innerHTML = message;
             Ext.get("loadingPanelSettings").dom.innerHTML =  message;
             Ext.get("loadingPanelOverview").dom.innerHTML =  message;
             Ext.get("loadingPanelReview").dom.innerHTML =  message;
             Ext.get("loadingPanelView").dom.innerHTML =  message;
             
        }
}

          
}

function responseIsError(apiResponse)
{  
    try
    {
        // decode response
        var jsonData = Ext.util.JSON.decode(apiResponse);
        var details;
        
        // api error?
        if(jsonData.opstat == "error")
        {       
            details = jsonData.err.msg
            notifyWithDetails(TEXT_ERROR_TYPE_API, TEXT_ERROR_TYPE_API, details, "error");
            
            if(globalOperation == "login")
                btnLoggOff_Click();
            
            return true;
        }
        // server script error?
        else if(jsonData.opstat == "serverError")
        {    
            details = jsonData.response;                   
            notifyWithDetails(TEXT_ERROR_TYPE_SERVER, TEXT_ERROR_MESSAGE_SERVER, details, "error");
            
            if(globalOperation == "login")
                btnLoggOff_Click();
           
            return true;
        }
        
        return false;
    }
    catch(err)
    {   
        // bad format error 
        details = 'Response: <br />' + apiResponse;
        notifyWithDetails(TEXT_ERROR_TYPE_PARSING, TEXT_ERROR_MESSAGE_PARSING, details, "error");
        
        if(globalOperation == "login")
            btnLoggOff_Click();
        
        return true;
    }  
     
}

//********
/*
// cound words excluding pattern [[[do not translate]]]
function CountWords2(this_field, show_word_count, show_char_count)
{
    if(show_word_count===undefined)
    {
        show_word_count=true;//show is default 
    } 
    if(show_char_count===undefined)
    {
        show_char_count=false; //noshow is deft
    } 
    
    el=document.getElementById(this_field);
    char_count=el.value.length;          // very crude measure
    fullStr=el.value+" "; // add space delimiter to end of text
    
         //********
    // remove non-for-translate phrases 
//    alert('quitando espacios:<br />' + left_trimmedStr);
    non_translate_words_rExp = /\[\[\[.*\]\]\]+/gi; // matches strings like "[[[do not translate this phrase]]]"
    toTranslateStr=fullStr.replace(non_translate_words_rExp, "?");
//    alert('quitando [[[***]]]<br />' + cleanedStr);
    
    //********
    
    initial_whitespace_rExp= /^[^A-Za-z0-9]+/gi; //use for complex whitespace
    left_trimmedStr=toTranslateStr.replace(initial_whitespace_rExp, " ");
        

    
    
    non_alphanumerics_rExp=/[^A-Za-z0-9]+/gi;   // and for delimiters
    cleanedStr=left_trimmedStr.replace(non_alphanumerics_rExp, " ");
    
   
    
    splitString=cleanedStr.split(" ");
    word_count=splitString.length -1;
    
    if(fullStr.length <2)
    {
        word_count=0;
    }
    if(word_count===1)
    {
        wordOrWords=" word";}else{wordOrWords=" words";
    }
    if(char_count===1)
    {
        charOrChars=" character";
    }
    else
    {
        charOrChars=" characters";
    }
    if(show_word_count && show_char_count)
    {
      msg="Word Count:\n"+" "+word_count+wordOrWords+"\n";
      msg += " "+char_count+charOrChars;
      //window.alert(msg);
    }
    else
    {
      if(show_word_count)
      {
        //alert("Word Count:  "+word_count+wordOrWords);
      }
      else
      {
        if(show_char_count)
        {
          //window.alert("Character Count:  "+char_count+charOrChars);
        }
      }
    }
    
    alert('word_count: ' + word_count);
    return word_count;
}
*/
//********

function CountWords(this_field, show_word_count, show_char_count)
{
    if(show_word_count===undefined)
    {
        show_word_count=true;//show is default 
    } 
    if(show_char_count===undefined)
    {
        show_char_count=false; //noshow is deft
    } 
    
    el=document.getElementById(this_field);
    char_count=el.value.length;          // very crude measure
    fullStr=el.value+" "; // add space delimiter to end of text
    initial_whitespace_rExp= /^[^A-Za-z0-9]+/gi; //use for complex whitespace
    left_trimmedStr=fullStr.replace(initial_whitespace_rExp, " ");
    non_alphanumerics_rExp=/[^A-Za-z0-9]+/gi;   // and for delimiters
    cleanedStr=left_trimmedStr.replace(non_alphanumerics_rExp, " ");    
    splitString=cleanedStr.split(" ");
    word_count=splitString.length -1;
    
    if(fullStr.length <2)
    {
        word_count=0;
    }
    if(word_count===1)
    {
        wordOrWords=" word";
    }
    else
    {
    wordOrWords=" words";
    }
    if(char_count===1)
    {
        charOrChars=" character";
    }
    else
    {
        charOrChars=" characters";
    }
    if(show_word_count && show_char_count)
    {
      msg="Word Count:\n"+" "+word_count+wordOrWords+"\n";
      msg += " "+char_count+charOrChars;
      //window.alert(msg);
    }
    else
    {
      if(show_word_count)
      {
        //alert("Word Count:  "+word_count+wordOrWords);
      }
      else
      {
        if(show_char_count)
        {
          //window.alert("Character Count:  "+char_count+charOrChars);
        }
      }
    }
    return word_count;
}

function tabControl_tabChange(panel, newTab)
{
//    alert('tabControl_tabChange. New tab: ' +  newTab.getId());    

    if(newTab.getId() == 'overvew')
    {
         addJobActions();
    }
}


function tabControl_beforetabchange(tabPanel, newTab, currentTab)
{
//    alert('activating tab: ' +  newTab.getId());    

    if(newTab.getId() == 'overvew')
    {
        if(gridJobs.getStore() == null || gridJobs.getStore().getCount() == 0)
        {
            gridJobs.hidden = true;
        }     
        
    }
}

function SetEventHandlers()
{
      // home    
      btnShowSettings.on('Click', btnShowSettings_Click);
      btnShowOrder.on('Click', btnShowOrder_Click);
      btnShowOverview.on('Click', btnShowOverview_Click);
      btnRefresh.on('Click', btnRefresh_Click);
      
      // window
      tabControl.on('beforetabchange', tabControl_beforetabchange);
      tabControl.on('tabchange', tabControl_tabChange);     
//      wdMain.on('afterlayout', wdMain_afterlayout);
        
     // tabSettings
      btnClearSett.on('Click', btnClearSett_Click);
      btnLogin.on('Click', btnLogin_Click);
      txtPrivateKey.on('keyPress', txtPrivateKey_KeyPress);
      txtPublicKey.on('keyPress', txtPrivateKey_KeyPress);
     
     // tabOrder
     btnOrder.on('Click',btnOrder_Click);
     cbLanguage1.on('beforeselect', cbLanguage1_Beforeselect);
     cbLanguage2.on('beforeselect', cbLanguage2_Beforeselect);
     txtTextToTranslate.on('keypress', txtTextToTranslate_Keypress);
     btnTierStandard.on('toggle', btnTier_Toggle);
     btnTierPro.on('toggle', btnTier_Toggle);
     btnTierUltra.on('toggle', btnTier_Toggle);
     btnTierMachine.on('toggle', btnTier_Toggle);
     
     //******
     txtJobSlug.on('keypress', txtJobSlug_Keypress);
     
     //******
     
     // tabOverview
     gridJobs.on('cellclick', gridJobs_Cellclick);
//     gridJobs.on('afterlayout', gridJobs_Afterlayout);   
     
     // tabReview     
     btnApprove.on('Click', btnApprove_Click);
     //btnOkReview.on('Click', btnOkReview_Click);     
     
     // tabView
     btnOkView.on('Click', btnOkView_Click);
     
 
}

//************

function updateTabOrderSubmitControls()
{
    var titleSet = (txtJobSlug.getValue() != '');
    var language1Set = cbLanguage1.getValue() != '';
    var language2Set = cbLanguage2.getValue() != '';
    var tierSet = (btnTierStandard.pressed || btnTierPro.pressed || btnTierUltra.pressed || btnTierMachine.pressed);
    var textSet = (txtTextToTranslate.getValue() != '');

    if( titleSet && language1Set && language2Set && tierSet && textSet)
        btnOrder.setDisabled(false);
    else
       btnOrder.setDisabled(true);
}

function txtJobSlug_Keypress(sender, e)
{
        // update btnOrder state
        updateTabOrderSubmitControls();
}

//************

function gridJobs_Afterlayout(container, layout)
{
//    alert('gridJobs_Afterlayout. tabControl.rendered=' + tabControl.rendered);
//    addJobActions();
}

function wdMain_afterlayout()
{
//    alert('wdMain_afterlayout. tabControl.rendered=' + tabControl.rendered);
//    addJobActions();
}

function btnTier_Toggle(sender, pressed)
{
    // save selected tier price for further calculations
    if(pressed)   
        tierPrice = sender.name; 
               
    // refresh totals    
    txtTextToTranslate_Keypress(sender, '');
    
    // update btnOrder state
    updateTabOrderSubmitControls();

}
function showTabViewReview()
{    
    //alert('hiding tabReview');
    var tbViewReviewTitle= "View/Review";
    tabControl.getItem(4).setTitle(tbViewReviewTitle);
    tabControl.hideTabStripItem(3);
    tabControl.unhideTabStripItem(4);
    tabControl.getItem(4).setDisabled(true);
       
}


// adds job action buttons
function addJobActions()
{     
    if(!tabControl.rendered)
    {
//        alert('trying  to add actions to tab not rendered');
        return;
        //tabControl.render();
    }
    
//    alert('before checking conditions for adding actions'); 
    // if no jobs or buttons already added, do nothing
    if(gridJobs == null)
    {
//        alert('gridJobs == null');
        return;
    }
    if(gridJobs.getStore() == null)
    {
//        alert('gridJobs.getStore() == null');
        return;
    }    
    if(!(gridJobs.getStore().getCount() > 0))
    {
//        alert('!(gridJobs.getStore().getCount() > 0)');
        return;
    }    
    var firstId = gridJobs.getStore().getAt(0).get('job_id');
    if(Ext.get('containerBtnView'+firstId) == null)
    {
//        alert("Ext.get(-containerBtnView-+firstId) == null");
        return;    
    }    
    if(!(Ext.get('containerBtnView'+firstId).dom.innerHTML == ""))
    {
//        alert('!(Ext.get(-containerBtnView-+firstId).dom.innerHTML == "")');
        return;
    }
        
//    alert('adding actions');
    
    // add action buttons to each job row       
    var jobCount = gridJobs.getStore().getCount();
    var btnView;
    var recordId;
    for(var i = 0; i < jobCount; i++)
    {
        recordId = gridJobs.getStore().getAt(i).get('job_id');      
        
        // add btnView
        btnView = new Ext.Button({
           id:'btnView' + recordId,
           name: 'btnView' + recordId,
           text:'<div><p class=\"textSmallButton\">View</p></div>',
           width: 60,
           height:30,
           //handler: btnView2_Click,          
           renderTo: Ext.get('containerBtnView' + recordId)
        });        
        btnView.on('Click', btnView_Click)
        
        // add btnReview
        btnReview = new Ext.Button({
           id:'btnReview' + recordId,
           name: 'btnReview' + recordId,
           text:'<div><p class=\"textSmallButton\">Review</p></div>',
           width: 60,
           height:30,
           //handler: btnView2_Click,          
           renderTo: Ext.get('containerBtnReview' + recordId)
        });        
        btnReview.on('Click', btnReview_Click)
        
        // add btnCancel
        btnCancel = new Ext.Button({
           id:'btnCancel' + recordId,
           name: 'btnCancel' + recordId,
           text:'<div><p class=\"textSmallButton\">Cancel</p></div>',
           width: 60,
           height:30,
           //handler: btnView2_Click,          
           renderTo: Ext.get('containerBtnCancel' + recordId)
        });      
        btnCancel.on('Click', btnCancel_Click)
        
        // enable/disable buttons according to job status
		var status = gridJobs.getStore().getAt(i).get("status");	
			
		if(status=="-1")
		{
		    btnView.setDisabled(true);
		    btnReview.setDisabled(true);
		    btnCancel.setDisabled(true);
		}
		else if(status == JOB_STATUS_AVAILABLE)
		{
		    btnView.setDisabled(false);
		    btnReview.setDisabled(true);
		    btnCancel.setDisabled(false);
		}
		else if(status == JOB_STATUS_PENDING)
		{
		    btnView.setDisabled(false);
		    btnReview.setDisabled(true);
		    btnCancel.setDisabled(true);
		}
		else if(status == JOB_STATUS_REVIEWABLE)
		{
		    btnView.setDisabled(true);
		    btnReview.setDisabled(false);
		    btnCancel.setDisabled(true);
		}
		else if(status == JOB_STATUS_APPROVED)
		{
		    btnView.setDisabled(false);
		    btnReview.setDisabled(true);
		    btnCancel.setDisabled(true);
		}
		else
		{
		    btnView.setDisabled(true);
		    btnReview.setDisabled(true);
		    btnCancel.setDisabled(true);
		}
		
        
    }
   
}

// get jobs
function getJobs(finalMessage, finalMessageType, goToOverview)
{  
    var status = "";
    var timestamp_after = "";
    var count = "5";
    
    //alert("getJobs()");
    
	MyGengoClient.Translate_Jobs_Get(status, 
                                    timestamp_after,
                                    count,
            function (result, request) {
                // check for error in response
                var response = result.responseText;                
                //alert("jobs: " + response);                              
                if(responseIsError(response))
                    return;
                                                       
                // process successful response
                // "{\"opstat\":\"ok\",\"response\":{...}}"
                var jsonData = Ext.util.JSON.decode(response);
                var jobList = jsonData.response;
			    
			    // update UI
			    // (load jobs in grid)		    
			    gridJobs.store.loadData(jsonData);
			    gridJobs.setDisabled(false);
			    
			    // enable controls	   
			    // (set logged in state)
			    // * enable home buttons
			    btnShowOrder.setDisabled(false);
			    btnShowOverview.setDisabled(false);
			    btnRefresh.setDisabled(false);
			    			    
			    // * enable tabs
			    tabControl.getItem(1).setDisabled(false);
                tabControl.getItem(2).setDisabled(false);
                
                // * disable setting fields
                txtPrivateKey.setDisabled(true);
                txtPublicKey.setDisabled(true);
                //btnClearSett.setDisabled(true);
                
                // * switch login button to log off
                btnLogin.setText("<div><p class=\"textMediumButton\">Log off</p></div>");               
                btnLogin.removeListener('Click', btnLogin_Click);
                btnLogin.on('Click', btnLoggOff_Click);
//                btnLogin.setDisabled(false);                   
                
                // add action buttons to jobGrid
                addJobActions();
                
                // reset tabReview     
                resetTabReview(true);
                
                // if required, go to tabOverview
                if(goToOverview)
                    tabControl.setActiveTab(2);
			    
			    // notify		    
			    notify(finalMessage, finalMessageType);	 
			    
			    // clear globalOperation
			    globalOperation = "";     
                              		
			}, 
			function (result, request) {			    		   
//			    notify(TEXT_ERROR_CONNECTION, "error");

                if(globalOperation == "login")
                    btnLoggOff_Click();
	    });	    
			   
}

// get language pairs
function getLanguagePairs(finalMessage, finalMessageType, goToOverview)
{	
    //alert("getLanguagePairs()");
    
	MyGengoClient.Translate_Service_LanguagePairs(
            function (result, request) {		  		
                   
                // check for error in response
                var response = result.responseText;                 
                //alert("languagePairs: " + response);                                                         
                if(responseIsError(response))               
                    return;
                                                       
                // process successful response
                // "{\"opstat\":\"ok\",\"response\":{...}}"
                var jsonData = Ext.util.JSON.decode(response);
                languagePairs = jsonData.response;
                
                // getJobs
                 getJobs(finalMessage, finalMessageType, goToOverview);                             
			    
			                           		
			}, 
			function (result, request) {			    		   
			   // notify(TEXT_ERROR_CONNECTION, "error");
			   
			   if(globalOperation == "login")
                    btnLoggOff_Click();
	    });
	
}

// get languages
function getLanguages(finalMessage, finalMessageType, goToOverview)
{    
    //alert("getLanguages()");
        
	MyGengoClient.Translate_Service_Languages(	        
            function (result, request) {                                   
                // check for error in response
                var response = result.responseText;               
                //alert("languages: " + response);                                            
                if(responseIsError(response))               
                    return;
                                                       
                // process successful response
                // "{\"opstat\":\"ok\",\"response\":{...}}"
                var jsonData = Ext.util.JSON.decode(response);
                languageList = jsonData.response;
                jsonLanguages = jsonData;              
			    
			    // create JsonStore		   
			    var storeLanguages1 = new Ext.data.JsonStore({
				    data: jsonData,
				    root: 'response',
				    fields: ['localized_name', 'lc', 'language']
			    });
			    
			    var storeLanguages2 = new Ext.data.JsonStore({
				    data: jsonData,
				    root: 'response',
				    fields: ['localized_name', 'lc', 'language']
			    });
			    
			    // update UI controls
			    // (load languages in comboboxes)			   
			    cbLanguage1.store = storeLanguages1;
			    cbLanguage1.setDisabled(false);
			    cbLanguage2.store = storeLanguages2;
			    cbLanguage2.setDisabled(false);		    
			    
			    // getLanguagePairs
			    getLanguagePairs(finalMessage, finalMessageType, goToOverview);
                              		
			}, 
			function (result, request) {			    		   
//			    notify(TEXT_ERROR_CONNECTION, "error");

                if(globalOperation == "login")
                    btnLoggOff_Click();
                    
	    });	    
			   
}

function getLanguageByCulture(lc)
{
    if(languageList == null)
        return;

    var language;
    for(var i = 0; i < languageList.length; i++)
    {
        if(languageList[i].lc == lc)
            return languageList[i].language;        
    }
    
    return language;
 
}

function getLanguageUnit(lc)
{
    if(languageList == null)
        return;

    var unit;
    for(var i = 0; i < languageList.length; i++)
    {
        if(languageList[i].lc == lc)
            return languageList[i].unit_type;        
    }
    
    return unit;
 
}



//*** Event Handlers ***
// home
function btnShowSettings_Click(button , e)
{   
    var firstRenderingTabs = !tabControl.rendered;
        
    ShowDialog(0);
    
    if(firstRenderingTabs)
    {  
        //alert('firstRenderingTabs: ' + firstRenderingTabs);  
        showTabViewReview();
    }
}

function btnShowOrder_Click(button , e)
{
    ShowDialog(1);
}

function btnShowOverview_Click(button , e)
{
    ShowDialog(2);
}

function btnRefresh_Click(button , e)
{
//    btnLogin_Click(button , e);
    
    var action = "refreshJobs";
    var finalMessage = TEXT_INFO_REFRESH_OK;
    var goToOverview = true;		    
    refresh(action, finalMessage, "info", goToOverview);
}


// tabSettings
function txtPrivateKey_KeyPress()
{   
/* 
    if((txtPublicKey.getValue() != "") && (txtPrivateKey.getValue() != ""))
    {
        btnLogin.setDisabled(false);
        btnClearSett.setDisabled(false);
    }
    else
    {
        btnLogin.setDisabled(true);
        btnClearSett.setDisabled(true);
    }
    */
}

function btnLoggOff_Click()
{   
    // update UI controls	
	// * disable home buttons
	 btnShowOrder.setDisabled(true);
     btnShowOverview.setDisabled(true);
     btnRefresh.setDisabled(true);
	
    // * disable tabs
	tabControl.getItem(1).setDisabled(true);
    tabControl.getItem(2).setDisabled(true);
    tabControl.getItem(3).setDisabled(true);
    tabControl.getItem(4).setDisabled(true);
    showTabViewReview();
    
    // * reset tabSettings
    txtPrivateKey.setValue('');
    txtPublicKey.setValue('');
    txtPrivateKey.setDisabled(false);
    txtPublicKey.setDisabled(false);
    //btnClearSett.setDisabled(true);
    //chbxRemember.setDisabled(false);
    
    // * toggle login/logoff button
    btnLogin.setText("<div><p class=\"textMediumButton\">Log in</p></div>");   
    btnLogin.removeListener('Click', btnLoggOff_Click);
    btnLogin.on('Click', btnLogin_Click);
    
    // * clear credits   
    document.getElementById("credits").innerHTML = '<div class="textCredits">' + TEXT_UI_YOUR_CREDITS + ': ' + '<span class="numberCredits">' + '---' + '</span></div>';
    
    // * delete keys cookies
    var cookieProvider = getCookieProvider();                 
    cookieProvider.clear("publicKey");
    cookieProvider.clear("privateKey");
    
    // if current operation is login means that some error occur during login,
    // don't show log off message since some error message is displayed.
    if(globalOperation == "login")
        return;
        
    // notify
    notify(TEXT_INFO_LOGOFF_OK, "info");
    
}

/* Updates credits, languages, jobs. */
function refresh(action, finalMessage, finalMessageType, goToOverview)
{    
    refresh(action, finalMessage, finalMessageType, goToOverview, false);
}

/* Updates credits, languages, jobs. */
function refresh(action, finalMessage, finalMessageType, goToOverview, saveKeys)
{
    // getCredits
    MyGengoClient.Account_Balance(
            function (result, request) {
                                   
                // check for error in response
                var response = result.responseText;                
                //alert("credits:" + response);                                                     
                if(responseIsError(response))
                    return;
                                                       
                // process successful response
                // "{\"opstat\":\"ok\",\"response\":{\"credits\":\"1003.60\"}}"                
                var jsonData = Ext.util.JSON.decode(response);        
//			    document.getElementById("credits").innerHTML = TEXT_UI_YOUR_CREDITS + jsonData.response.credits;
			    document.getElementById("credits").innerHTML = '<div class="textCredits">' + TEXT_UI_YOUR_CREDITS + ': ' + '<span class="numberCredits">' + jsonData.response.credits + '</span></div>';
			    	
			    
			    // refresh more data if action specifies so
			    if(action == "refreshCredits")
			    {
			        if(finalMessage != '')
			            notify(finalMessage, finalMessageType);
			        if(goToOverview)
			            tabControl.setActiveTab(2);    
			        return;
			    }
			    else if(action == "refreshAll")  // start a chain of calls that fetch all data
			    {
			        getLanguages(finalMessage, finalMessageType, goToOverview);
			        // hide tabReview
                    tabControl.hideTabStripItem(3);
			    }
			    else if (action == "refreshJobs") // refresh jobs only
			        getJobs(finalMessage, finalMessageType, goToOverview);
			   
			   // save api keys as cookies (this is when login in for first time)
			   if(saveKeys)
			   {
                   var cookieProvider = getCookieProvider();                 
                   cookieProvider.set("publicKey", MyGengoClient.publicKey);
                   cookieProvider.set("privateKey", MyGengoClient.privateKey);
                                              
               }
              
               // show keys in login text fields 
               txtPrivateKey.setValue(MyGengoClient.privateKey);
               txtPublicKey.setValue(MyGengoClient.publicKey);
			            		
			},
			function (result, request) {			   
			    MyGengoClient.publicKey = "";
                MyGengoClient.privateKey = "";
                
                if(globalOperation == "login")
                    btnLoggOff_Click();
                    
			    //notify(TEXT_ERROR_CONNECTION, "error");
			    
    });
				
}

function login(privateKey, publicKey, saveKeys)
{   
    MyGengoClient.publicKey = publicKey;
    MyGengoClient.privateKey = privateKey;
    
    // disable login fields
    txtPrivateKey.setDisabled(true);
    txtPublicKey.setDisabled(true);
    //chbxRemember.setDisabled(true);
    //btnClearSett.setDisabled(true);
    //btnLogin.setDisabled(true);

    // refreshAll
    globalOperation = "login";
    var action = "refreshAll";    
    var finalMessage = TEXT_INFO_LOGIN_OK;
    var goToOverview = true;		   
    refresh(action, finalMessage, "info", goToOverview, saveKeys);
    
}

function btnLogin_Click(button , e)
{ 
    // validate form (keys can't be empty)
    // check private key
    var emptyField = false;
    if(txtPrivateKey.getValue() == '')
    {  
        emptyField = true;        
        // show warning "Empty field" (if not already visible)
        if(Ext.get('lblPrivateKey1').dom.innerHTML.indexOf(TEXT_WARNING_EMPTY_FIELD) == -1)
        {         
            Ext.get('lblPrivateKey1').dom.innerHTML = Ext.get('lblPrivateKey1').dom.innerHTML + ' <span class="textWarning">(' + TEXT_WARNING_EMPTY_FIELD + ')</span>';
            
        }
        
    }
    else
    {
        // reset labels text
         Ext.get('lblPrivateKey1').dom.innerHTML = ' Private Key ';
    }
    
    // check public key
    if(txtPublicKey.getValue() == '')
    {
         emptyField = true;        
        // show warning "Empty field" (if not already visible)
        if(Ext.get('lblPublicKey1').dom.innerHTML.indexOf(TEXT_WARNING_EMPTY_FIELD) == -1)
        {         
            Ext.get('lblPublicKey1').dom.innerHTML = Ext.get('lblPublicKey1').dom.innerHTML + ' <span class="textWarning">(' + TEXT_WARNING_EMPTY_FIELD + ')</span>';
        }
        
        return;
    }
    else
    {
        // reset labels text
         Ext.get('lblPublicKey1').dom.innerHTML = ' Public Key ';
    }
    
    if(emptyField)
        return; 
   

    // fetch all data
    var publicKey = txtPublicKey.getValue();
    var privateKey = txtPrivateKey.getValue();    
    var saveKeys = true; //chbxRemember.checked;
    login(privateKey, publicKey, saveKeys);

    // MyGengoClient.publicKey = txtPublicKey.getValue();
    // MyGengoClient.privateKey = txtPrivateKey.getValue();   
    
    // refreshAll    
//    var action = "refreshAll";
//    var finalMessage = TEXT_INFO_LOGIN_OK;
//    var goToOverview = true;		   
//    refresh(action, finalMessage, "info", goToOverview);
    				
}

function btnClearSett_Click(Button , e)
{ 
    txtPrivateKey.reset();
    txtPublicKey.reset();
       
}

// tabOrder

function txtTextToTranslate_Keypress(sender, e)
{
    // count words
    if(Ext.util.Format.undef(tierPrice) == '')     
        tierPrice = 0;    
       
    var totalWords = CountWords('text', '', '');
    var totalPrice = totalWords * tierPrice;    
    var unit = getLanguageUnit(cbLanguage1.getValue());
    if(unit == undefined || unit == '' || unit == null)
        unit = "word";
    lblTotalWords.setText('(' + totalWords + ' ' + unit.substring(0, 4) +'s)');     
    lblTotalPrice.setText(Ext.util.Format.usMoney(totalPrice));
    
    // update btnOrder state
    updateTabOrderSubmitControls();
}

function resetTierButtons()
{
    // disable all tiers
    btnTierStandard.setDisabled(true);
    btnTierPro.setDisabled(true);
    btnTierUltra.setDisabled(true);
    btnTierMachine.setDisabled(true);
    
    // clear selection
    btnTierStandard.toggle(false);
    btnTierPro.toggle(false);
    btnTierUltra.toggle(false);
    btnTierMachine.toggle(false)
}

function cbLanguage1_Beforeselect(comboBox, record, index)
{
    //alert("lc_src: " + record.get("lc"));    
   
    // disable tier buttons    
    resetTierButtons();  
    
    // restore cbLanguages2.Store
    cbLanguage2.store.loadData(jsonLanguages);  
   
    // get indexes of unsupported languages
    var languages = languageList;    
    var indexesToDelete = new Array();
    var countIndexesToDelete = 0;
    var matched;
    for(var i = 0; i < cbLanguage2.store.getCount(); i++)
    {
        matched = false;
        for(var j = 0; j < languagePairs.length; j++)
        {           
            if((languagePairs[j].lc_src == record.get("lc")) && (languagePairs[j].lc_tgt == cbLanguage2.store.getAt(i).get("lc")))
            {
                matched = true;
                break;
            }
        }
        
        if(!matched)
        {
            indexesToDelete[countIndexesToDelete] = cbLanguage2.store.getAt(i);
            countIndexesToDelete++;
        }       
        
    }
    
    // remove unsupported languages from combo2
    for(var i = 0; i < indexesToDelete.length; i++)
    {
         cbLanguage2.store.remove(indexesToDelete[i]);
    }
    
    // clear selection in cbLanguage2
    cbLanguage2.clearValue();
    
    // set $0.00 price
    lblTotalPrice.setText(Ext.util.Format.usMoney(0.00));
    
    // update btnOrder state
    updateTabOrderSubmitControls();
    
}

function cbLanguage2_Beforeselect(comboBox, record, index)
{
   // if no src language selected, do nothing
   if(cbLanguage1.getValue() == '')
        return;  
           
    // disable tier buttons    
    resetTierButtons();   

    // get unit
    var unit = getLanguageUnit(cbLanguage1.getValue());
    lbStandar.setText("$/" + unit);
    lbStandar.setDisabled(false);
    var totalWords = CountWords('text', '', '');
    lblTotalWords.setText('(' + totalWords + ' ' + unit.substring(0, 4) +'s)');

    // get supported tiers for the selected pair
    var supportedTiers = new Array();  
    var tier;
    var price;
    var textPricePerUnit;
    for(var i = 0; i < languagePairs.length; i++)
    {
       //alert("checking pair:" + languagePairs[i].lc_src + "-" + languagePairs[i].lc_tgt);
       if((languagePairs[i].lc_src == cbLanguage1.getValue()) && (languagePairs[i].lc_tgt == record.get("lc")))
       {               
            tier = languagePairs[i].tier;
            price = Ext.util.Format.usMoney(languagePairs[i].unit_price);
            textPricePerUnit = price + "/" + unit.substring(0, 4);
            if(price == "$0.00")
                textPricePerUnit = "Free!";
            
            if(tier == TIER_STANDARD)
            {                 
                btnTierStandard.setText('<div class="textTier">Standard<br/>' + textPricePerUnit + '</div>');
                btnTierStandard.setDisabled(false);
                btnTierStandard.name = languagePairs[i].unit_price;                               
            }
            else if(tier == TIER_PRO)
            {               
                btnTierPro.setText('<div class="textTier">Pro<br/>' + textPricePerUnit + '</div>');
                btnTierPro.setDisabled(false); 
                btnTierPro.name = languagePairs[i].unit_price;           

            }
            else if(tier == TIER_ULTRA)
            {           
                btnTierUltra.setText('<div class="textTier">Ultra<br/>' + textPricePerUnit + '</div>');
                btnTierUltra.setDisabled(false);
                btnTierUltra.name = languagePairs[i].unit_price;

            }
            else if(tier == TIER_MACHINE)
            { 
                btnTierMachine.setText('<div class="textTier">Machine<br/>' + textPricePerUnit + '</div>');
                btnTierMachine.setDisabled(false);
                btnTierMachine.name = languagePairs[i].unit_price;
                
            }
                        
       }       
       
    }
    
    // set $0.00 price
    lblTotalPrice.setText(Ext.util.Format.usMoney(0.00));
    
    // update btnOrder state
    updateTabOrderSubmitControls();
    
}

function resetTabOrder()
{ 
    txtJobSlug.setValue('');
    cbLanguage1.clearValue();
    cbLanguage2.clearValue();    
    resetTierButtons();
    txtTextToTranslate.setValue('');
    txtComment.setValue('');
    lblTotalWords.setText('(0 words)');
    lblTotalPrice.setText('$0.00'); 
     
}

function btnOrder_Click(button , e)
{  
    var type = "text";
    var slug = txtJobSlug.getValue();
    var body_src = txtTextToTranslate.getValue();
    var lc_src = cbLanguage1.getValue();
    var lc_tgt = cbLanguage2.getValue();
    
    var tier;
    if(btnTierStandard.pressed)
        tier = "standard";
    else if(btnTierPro.pressed)
        tier = "pro";
    else if(btnTierUltra.pressed)
        tier = "ultra";
    else if(btnTierMachine.pressed)
        tier = "machine";
            
    var auto_approve = "0"; // (chbxAutoApprove.getValue() == true)? "1": "0";
    var custom_data = "";    
    var comment = txtComment.getValue();
    
    MyGengoClient.Translate_Jobs(type, 
                                slug, 
                                body_src, 
                                lc_src, 
                                lc_tgt,
                                tier,
                                 auto_approve,
                                custom_data, 
                                comment,
            function (result, request) {                
                // check for error in response
                var response = result.responseText;
                //alert("job ordered: " + response);
                if(responseIsError(response))
                    return;
                                                       
                // process successful response
                // "{\"opstat\":\"ok\",\"response\":{...}"                
                var jsonData = Ext.util.JSON.decode(response);              
                
                // reset tabOrder
                resetTabOrder();		    

			    // refresh info
			    var action = "refreshJobs";
			    var finalMessage = TEXT_INFO_ORDER_OK + " <br />" + TEXT_INFO_NEW_JOB_ID + ":" + jsonData.response.jobs[0].job1.job_id;		    
			    var goToOverview = false;
			    refresh(action, finalMessage, "info", goToOverview);
			    		
			},
			function (result, request) {		    	   
			    //notify(TEXT_ERROR_CONNECTION, "error");
			    			    
			});
									
}

// tabOverview

function gridJobs_Cellclick(grid, rowIndex, columnIndex, e) 
{
        /*
		var record = grid.getStore().getAt(rowIndex);  // Get the Record
        var status = record.get("status");      
		
		// if selection=sample job, disable all buttons		
		if(status=="-1")
		{
		    btnView.setDisabled(true);
		    btnReview.setDisabled(true);
		    btnCancel.setDisabled(true);
		}
		else if(status == JOB_STATUS_AVAILABLE)
		{
		    btnView.setDisabled(false);
		    btnReview.setDisabled(true);
		    btnCancel.setDisabled(false);
		}
		else if(status == JOB_STATUS_PENDING)
		{
		    btnView.setDisabled(false);
		    btnReview.setDisabled(true);
		    btnCancel.setDisabled(true);
		}
		else if(status == JOB_STATUS_REVIEWABLE)
		{
		    btnView.setDisabled(false);
		    btnReview.setDisabled(false);
		    btnCancel.setDisabled(true);
		}	
		*/
}


function updateJobCounters()
{
    var countAvailable = gridJobs.store.query('status', JOB_STATUS_AVAILABLE).length;
    var countPending = gridJobs.store.query('status', JOB_STATUS_PENDING).length;
    var countReviewable = gridJobs.store.query('status', JOB_STATUS_REVIEWABLE).length;
    lblCountAvailableJobs.setText(countAvailable + ' ' + JOB_STATUS_AVAILABLE_FRIENDLY_1);
    lblCountPendingJobs.setText(countPending + ' ' +  JOB_STATUS_PENDING_FRIENDLY);
    lblCountReviewableJobs.setText(countReviewable + ' ' + JOB_STATUS_REVIEWABLE_FRIENDLY);
}

function resetTabView(changeSelectionIfRequired)
{    
    // clear fields   
    txtBodyOriginalView.setValue('');
    txtBodyTranslatedView.setValue('');
    Ext.get("previewLanguageSrcView").dom.innerHTML = '';
    Ext.get("previewLanguageTgtView").dom.innerHTML = '';   
    
    // reset title
    tabControl.getItem(4).setTitle("View");
        
    // disable controls
    tabControl.getItem(4).setDisabled(true);  
    
    // if tabView is active, change selection to tabOverview    
    if(changeSelectionIfRequired && (tabControl.getActiveTab().getId() == 'view'))
    {
        tabControl.setActiveTab(2);
    }
     
}

function btnView_Click(button, e)
{
    var recordId = button.getId().split("btnView")[1];
    selectedJobRecord = gridJobs.store.getById(recordId);
    //alert("View Job: #" + selectedJobRecord.get('job_id'));
    
    // display selected job in gridJobDetails
    gridJobDetailsView.store.removeAll();
    gridJobDetailsView.store.add(new Array(selectedJobRecord));
    
    // reset tabView    
    resetTabView(false);
    
    // hide tabReview
    tabControl.hideTabStripItem(3);
    
    // activate tabView
    var tbViewTitle = "View (Job #" + selectedJobRecord.get('job_id') + ")";
    tabControl.getItem(4).setTitle(tbViewTitle);
    tabControl.getItem(4).setDisabled(false);
    tabControl.unhideTabStripItem(4);
    tabControl.setActiveTab(4);    
   
    // get job details    
    Ext.get("loadingPreviewTextView").dom.innerHTML = "<img src=\"~/_wpresources/MiguelRa.spGengo/ext.js/images/default/shared/loading-balls.gif\">";           
    Ext.get("loadingPreviewImageView").dom.innerHTML = "<img src=\"~/_wpresources/MiguelRa.spGengo/ext.js/images/default/shared/loading-balls.gif\">";      
                        
        var jobId = selectedJobRecord.get('job_id');        
        // if job is not approved yet, request machine pre-translation
        var pre_mt = '';
        if(!(selectedJobRecord.get('status') == JOB_STATUS_APPROVED))
        {
            pre_mt = '1';
            lblWarningMachine.show(); // show machine translation warning            
        }
        else
        {            
            lblWarningMachine.hide(); // job is approved: hide machine translation warning
        }
        // call api
        MyGengoClient.TranslateJobGetId(jobId, 
                                        pre_mt,
            function (result, request) {
                  
                // check for error in response
                var response = result.responseText;
//                alert("jobPreview: " + response);                                                         
                if(responseIsError(response))
                {  
                     // hide loading symbols
                    Ext.get("loadingPreviewTextView").dom.innerHTML = "";
                    Ext.get("loadingPreviewImageView").dom.innerHTML = "";
                    return;
                }
                                                       
                // process successful response
                // "{\"opstat\":\"ok\",\"response\":{...}}"
                var jsonData = Ext.util.JSON.decode(response);
                
                // * display original text and machine pre-translation
                //txtBodyOriginalView.setValue(jsonData.response.job.body_src);
                
                Ext.get("txtBodyTranslatedView").dom.innerHTML = jsonData.response.job.body_tgt;
                Ext.get("txtBodyOriginalView").dom.innerHTML = jsonData.response.job.body_src;
                              
                Ext.get("previewLanguageSrcView").dom.innerHTML = '[' + getLanguageByCulture(selectedJobRecord.get('lc_src')) + ']';
                Ext.get("previewLanguageTgtView").dom.innerHTML = '[' + getLanguageByCulture(selectedJobRecord.get('lc_tgt')) + ']';            
                                            
                // * hide loading symbols
                Ext.get("loadingPreviewTextView").dom.innerHTML = "";
                Ext.get("loadingPreviewImageView").dom.innerHTML = "";
                
			},
			function (result, request) {	
			   // hide loading symbols
               Ext.get("loadingPreviewTextView").dom.innerHTML = "";
               Ext.get("loadingPreviewImageView").dom.innerHTML = "";
                	   
	    });
        
}

function resetTabReview(changeSelectionIfRequired)
{    
    // clear fields    
    txtBodyOriginal.setValue('');
    
    if(tabControl.rendered)
    {
        Ext.get("previewLanguageSrc").dom.innerHTML = '';
        Ext.get("previewLanguageTgt").dom.innerHTML = '';
        Ext.get("imgPreview").dom.innerHTML = '<img src="~/_wpresources/MiguelRa.spGengo/spGengo/images/translationPreview.png" />';
    }
    
    // reset title
    tabControl.getItem(3).setTitle("Review");
    
    // reset rating options
    btnRating1.toggle(false);
    btnRating2.toggle(false);
    btnRating3.toggle(false);
    btnRating4.toggle(false);
    btnRating5.toggle(false);
    
    // disable controls
    tabControl.getItem(3).setDisabled(true);
    btnApprove.setDisabled(true);
    btnRating1.setDisabled(true);
    btnRating2.setDisabled(true);
    btnRating3.setDisabled(true);
    btnRating4.setDisabled(true);
    btnRating5.setDisabled(true);
    
    // set imagePreview container to auto-scrolling
    tblImagePreview.setAutoScroll(true);
    
    // if tabReview is active, change selection to tabOverview    
    if(tabControl.rendered && changeSelectionIfRequired && (tabControl.getActiveTab().getId() == 'review'))
    {
        tabControl.setActiveTab(2);
    }
     
}

function btnReview_Click(button, e)
{     
    var recordId = button.getId().split("btnReview")[1];
    selectedJobRecord = gridJobs.store.getById(recordId);
    //alert("Review Job: #" + selectedJobRecord.get('job_id'));
    
    // display selected job in gridJobDetails
    gridJobDetails.store.removeAll();
    gridJobDetails.store.add(new Array(selectedJobRecord));
    
    // reset tabReview     
    resetTabReview(false);
    
    // hide tabView
    tabControl.hideTabStripItem(4);
    
    // activate tabReview
    var tbReviewTitle = "Review (Job #" + selectedJobRecord.get('job_id') + ")";
    tabControl.getItem(3).setTitle(tbReviewTitle);    
    tabControl.getItem(3).setDisabled(false);
    tabControl.unhideTabStripItem(3);  
    tabControl.setActiveTab(3);
    
    // build links to Reject and Corrections
    Ext.get('linkRejectJob').dom.innerHTML =  '<a href="http://mygengo.com/translate/job/details/' +  selectedJobRecord.get('job_id') + '" class=\"textParnt\"> Reject </a>';   
    Ext.get('linkCorrectJob').dom.innerHTML =  '<a href="http://mygengo.com/translate/job/details/' +  selectedJobRecord.get('job_id') + '" class=\"textParnt\"> Request correction </a>';   
   
   // get job preview    
        Ext.get("loadingPreviewText").dom.innerHTML = "<img src=\"~/_wpresources/MiguelRa.spGengo/ext.js/images/default/shared/loading-balls.gif\">";           
        Ext.get("loadingPreviewImage").dom.innerHTML = "<img src=\"~/_wpresources/MiguelRa.spGengo/ext.js/images/default/shared/loading-balls.gif\">";           
                
        var jobId = selectedJobRecord.get('job_id');
        //alert('jobId: ' + jobId);
        MyGengoClient.getJobPreview(jobId,
            function (result, request) {		  		
                   
                // check for error in response
                var response = result.responseText;
//                alert("jobPreview: " + response);                                                         
                if(responseIsError(response))
                {  
                     // hide loading symbols
                    Ext.get("loadingPreviewText").dom.innerHTML = "";
                    Ext.get("loadingPreviewImage").dom.innerHTML = "";
                    return;
                }
                                                       
                // process successful response
                // "{\"opstat\":\"ok\",\"response\":{...}}"
                var jsonData = Ext.util.JSON.decode(response);
                
                // * display original text and translation preview
//                txtBodyOriginal.setValue(jsonData.response.body_src);
                Ext.get("txtBodyOriginal").dom.innerHTML = jsonData.response.body_src;
                
                Ext.get("previewLanguageSrc").dom.innerHTML = '[' + getLanguageByCulture(selectedJobRecord.get('lc_src')) + ']';
                Ext.get("previewLanguageTgt").dom.innerHTML = '[' + getLanguageByCulture(selectedJobRecord.get('lc_tgt')) + ']';                 
                Ext.get("imgPreview").dom.innerHTML = '<img src="' + jsonData.response.imagePreview + '" />';
                
                // * enable action controls
                btnApprove.setDisabled(false);
                btnRating1.setDisabled(false);
                btnRating2.setDisabled(false);
                btnRating3.setDisabled(false);
                btnRating4.setDisabled(false);
                btnRating5.setDisabled(false); 
                                            
                // * hide loading symbols
                Ext.get("loadingPreviewText").dom.innerHTML = "";
                Ext.get("loadingPreviewImage").dom.innerHTML = "";
			},
			function (result, request) {	
			   // hide loading symbols
                Ext.get("loadingPreviewText").dom.innerHTML = "";
                Ext.get("loadingPreviewImage").dom.innerHTML = "";
                	   
	    });
   
    
}

function btnCancel_Click(button, e)
{
    var recordId = button.getId().split("btnCancel")[1];
    selectedJobRecord = gridJobs.store.getById(recordId);
    //alert("Cancel Job: #" + selectedJobRecord.get('job_id'));
      
    // cancel job                       
        var jobId = selectedJobRecord.get('job_id');
               
        MyGengoClient.TranslateJobCancel(jobId,                                       
            function (result, request) {		  		
                   
                // check for error in response
                var response = result.responseText;
//                alert("jobCancel: " + response);                                                         
                if(responseIsError(response))
                {                   
                    return;
                }
                                                       
                // process successful response
                // "{\"opstat\":\"ok\",\"response\":{...}}"
                var jsonData = Ext.util.JSON.decode(response);
                
                // refresh credits
                var action = "refreshCredits";
                var finalMessage = TEXT_INFO_CANCEL_OK + " <br />" + TEXT_INFO_NEW_JOB_ID + ":" + jobId;
                var goToOverview = false;
                refresh(action, finalMessage, "info", goToOverview);
                
                // update gridJobs
                selectedJobRecord.set('status', JOB_STATUS_CANCELLED);
                selectedJobRecord.commit();
                gridJobs.reconfigure(gridJobs.store, gridJobs.getColumnModel());
                // add action buttons to jobGrid
                addJobActions();
                
			},
			function (result, request) {
			  
                	   
	    });
            
}

//********* tabReview ********

function btnApprove_Click(button, e)
{
    // get parameters for call   
    var jobId = selectedJobRecord.get('job_id');
    
    var rating;
    if(btnRating1.pressed)
        rating = "1";    
    else if(btnRating2.pressed)
        rating = "2";        
    else if(btnRating3.pressed)
        rating = "3";       
    else if(btnRating4.pressed)
        rating = "4";       
    else if(btnRating5.pressed)
        rating = "5";  
   
    // call aprove method        
    MyGengoClient.TranslateJobApprove(jobId, rating,
            function (result, request) {		  		
                   
                // check for error in response
                var response = result.responseText;
//                alert("jobApprove: " + response);                                                         
                if(responseIsError(response))
                {    
                    Ext.get("loadingPreviewImage").dom.innerHTML = '';                            
                    return;
                }
                                                       
                // process successful response
                // "{\"opstat\":\"ok\",\"response\":{...}}"
                var jsonData = Ext.util.JSON.decode(response);              
                
                // reset tabReview     
//                resetTabReview(true);              
                
                // get translated text
                // * showProgress 
               Ext.get("loadingPreviewImage").dom.innerHTML = "<img src=\"~/_wpresources/MiguelRa.spGengo/ext.js/images/default/shared/loading-balls.gif\">";
               
               // * call getJob method
               var pre_mt = ''; 
               MyGengoClient.TranslateJobGetId(jobId, 
                                               pre_mt,
                    function (result, request) {		  		
                           
                        // check for error in response
                        var response = result.responseText;
                        //alert("jobTranslationDetais: " + response);                                                         
                        if(responseIsError(response))
                        { 
                            Ext.get("loadingPreviewImage").dom.innerHTML = '';                               
                            return;
                        }
                                                               
                        // process successful response                       
                        var jsonData = Ext.util.JSON.decode(response);                     
                        
                        // show translated text                        
                        Ext.get("imgPreview").dom.innerHTML = '';                        
                        txtBodyTranslated = new Ext.form.TextArea({
                            name: 'txtBodyTranslated' + jobId,
                            id: 'txtBodyTranslated' + jobId,
                            visible: true,
                            fieldLabel:'Translation',
                            emptyText: 'Translation',
                            readOnly: true,
                            enableKeyEvents:true,
                            //text: ' ',
                            width: 770,
                            height: 140
                        });
                        
                        txtBodyTranslated.render(Ext.get("imgPreview"));
                        Ext.get('txtBodyTranslated' + jobId).dom.innerHTML = jsonData.response.job.body_tgt;                       
                        
                        tblImagePreview.setAutoScroll(false);
                        tblImagePreview.doLayout();
                        
                        Ext.get("lblTranslatedText").dom.innerHTML = 'Translated text ';
                        
                        // disable action controls
                        btnApprove.setDisabled(true);
                        btnRating1.setDisabled(true);
                        btnRating2.setDisabled(true);
                        btnRating3.setDisabled(true);
                        btnRating4.setDisabled(true);
                        btnRating5.setDisabled(true);                       
                        
                        // hide loading symbol
                        Ext.get("loadingPreviewImage").dom.innerHTML = "";
                        
                        // notify
                        var message = TEXT_INFO_APPROVED_OK + " <br />" + TEXT_INFO_NEW_JOB_ID + ":" + jobId;
                        notify(message, "info");
           
                        
			        },
			        function (result, request) {			          
        			   Ext.get("loadingPreviewImage").dom.innerHTML = '';
                        	   
	            });                         
                
                // update gridJobs
                selectedJobRecord.set('status', JOB_STATUS_APPROVED);
                selectedJobRecord.commit();
                gridJobs.reconfigure(gridJobs.store, gridJobs.getColumnModel());
                
                // add action buttons to jobGrid
                addJobActions();
                                
			},
			function (result, request) {
			  Ext.get("loadingPreviewImage").dom.innerHTML = '';
                	   
	    });
	  
}

function btnOkReview_Click()
{
    btnOkView_Click();
}

//************** tabView ******************
function btnOkView_Click()
{
    // show tabViewReview
    showTabViewReview();
    
    // return to tabOverview
    tabControl.setActiveTab(2);
}


