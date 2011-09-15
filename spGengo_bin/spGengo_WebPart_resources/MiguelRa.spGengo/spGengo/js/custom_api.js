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
Proxy class to call api methods. 
Tasks: 
- Make AJAX calls to proper server components.
Dependencies:
 - custom_common.js
 - Ext JS
 
*/

function MyGengoClient()
{
    
} 

// change the lines below to toogle between real API and fake responses.
MyGengoClient.baseUrl = URL_BASE + 'asp/';    // invoking real API
//MyGengoClient.baseUrl = URL_BASE + 'asp_mock/'; // faking API responses

MyGengoClient.serverExtension = '.aspx';
MyGengoClient.publicKey = "";
MyGengoClient.privateKey = "";

// get credits
MyGengoClient.Account_Balance = function(successCallback, failureCallback)
{
    var method = 'Account_Balance';
    //alert("calling url: " + MyGengoClient.baseUrl + method + MyGengoClient.serverExtension);
	Ext.Ajax.request({
			url : MyGengoClient.baseUrl + method + MyGengoClient.serverExtension,
			params : { 
			        publicKey : MyGengoClient.publicKey, 
			        privateKey : MyGengoClient.privateKey
			        },
			method: 'POST',
			success: successCallback,
			failure: failureCallback
		});
}

// get languages
MyGengoClient.Translate_Service_Languages = function(successCallback, failureCallback)
{
    var method = 'Translate_Service_Languages';        
	Ext.Ajax.request({
			url : MyGengoClient.baseUrl + method + MyGengoClient.serverExtension,			
			params : { 
			        publicKey : MyGengoClient.publicKey, 
			        privateKey : MyGengoClient.privateKey
			        },
			method: 'POST',
			success: successCallback,
			failure: failureCallback 
		});
}

// get languagePairs
MyGengoClient.Translate_Service_LanguagePairs = function(successCallback, failureCallback)
{
    var method = 'Translate_Service_LanguagePairs';      
	Ext.Ajax.request({
			url : MyGengoClient.baseUrl + method + MyGengoClient.serverExtension,			
			params : { 
			        publicKey : MyGengoClient.publicKey, 
			        privateKey : MyGengoClient.privateKey
			        },
			method: 'POST',
			success: successCallback,
			failure: failureCallback
		});
}

// post job
MyGengoClient.Translate_Jobs = function(type, 
                                slug, 
                                body_src, 
                                lc_src, 
                                lc_tgt,
                                tier,
                                auto_approve,
                                custom_data, 
                                comment,
                                successCallback, 
                                failureCallback)
{

    var method = 'Translate_Jobs';
	Ext.Ajax.request({
			url : MyGengoClient.baseUrl + method + MyGengoClient.serverExtension, 
			params : { 
			        publicKey : MyGengoClient.publicKey,
			        privateKey : MyGengoClient.privateKey,
			        type : type,
			        slug: slug,
			        body_src: body_src,
			        lc_src: lc_src,
			        lc_tgt: lc_tgt,
			        tier: tier,
			        auto_approve: auto_approve,
			        custom_data: custom_data,
			        comment: comment			        
			        },
			method: 'POST',
			success: successCallback,
			failure: failureCallback
		});
}

// get jobs
MyGengoClient.Translate_Jobs_Get = function(status, 
                                timestamp_after, 
                                count,
                                successCallback, 
                                failureCallback)
{

    var method = 'Translate_Jobs_Get';
	Ext.Ajax.request({
			url : MyGengoClient.baseUrl + method + MyGengoClient.serverExtension, 
			params : { 
			        publicKey : MyGengoClient.publicKey,
			        privateKey : MyGengoClient.privateKey,
			        status : status,
			        timestamp_after: timestamp_after,
			        count: count			        
			        },
			method: 'POST',
			success: successCallback,
			failure: failureCallback
		});
}

 // get job preview
 MyGengoClient.getJobPreview = function(jobId, 
                             successCallback, 
                             failureCallback)
{   
    var method = 'getJobPreview';
    //alert("calling url: " + MyGengoClient.baseUrl + method + MyGengoClient.serverExtension + "?" + "jobId=" + jobId);
	Ext.Ajax.request({
			url : MyGengoClient.baseUrl + method + MyGengoClient.serverExtension, 
			params : {
		            jobId: jobId,	 
			        publicKey : MyGengoClient.publicKey,
			        privateKey : MyGengoClient.privateKey			        			        
			        },
			method: 'POST',
			success: successCallback,
			failure: failureCallback
		});
}

 // approve job
 MyGengoClient.TranslateJobApprove = function(jobId,
                                             rating, 
                                             successCallback, 
                                             failureCallback)
{   
    var method = 'Translate_Job_Approve';
//    alert("calling url: " + MyGengoClient.baseUrl + method + MyGengoClient.serverExtension);   
	Ext.Ajax.request({
			url : MyGengoClient.baseUrl + method + MyGengoClient.serverExtension, 
			params : {
		            jobId: jobId,
		            rating: rating,	 
			        publicKey : MyGengoClient.publicKey,
			        privateKey : MyGengoClient.privateKey			        			        
			        },
			method: 'POST',
			success: successCallback,
			failure: failureCallback
		});
}

 // getJobById
 MyGengoClient.TranslateJobGetId = function(jobId,
                                             pre_mt, 
                                             successCallback, 
                                             failureCallback)
{   
    var method = 'Translate_Job_Get_Id';
//    alert("calling url: " + MyGengoClient.baseUrl + method + MyGengoClient.serverExtension);   
	Ext.Ajax.request({
			url : MyGengoClient.baseUrl + method + MyGengoClient.serverExtension, 
			params : {
		            jobId: jobId,
		            pre_mt: pre_mt,	 
			        publicKey : MyGengoClient.publicKey,
			        privateKey : MyGengoClient.privateKey			        			        
			        },
			method: 'POST',
			success: successCallback,
			failure: failureCallback
		});
}

// cancelJobById
 MyGengoClient.TranslateJobCancel = function(jobId,                                              
                                             successCallback, 
                                             failureCallback)
{   
    var method = 'Translate_Job_Cancel';
//    alert("calling url: " + MyGengoClient.baseUrl + method + MyGengoClient.serverExtension);   
	Ext.Ajax.request({
			url : MyGengoClient.baseUrl + method + MyGengoClient.serverExtension, 
			params : {
		            jobId: jobId,		            
			        publicKey : MyGengoClient.publicKey,
			        privateKey : MyGengoClient.privateKey			        			        
			        },
			method: 'POST',
			success: successCallback,
			failure: failureCallback
		});
}

/*
// get keys
MyGengoClient.Get_Keys = function(successCallback, failureCallback)
{
    var method = 'Get_Keys';
	Ext.Ajax.request({
			url : MyGengoClient.baseUrl + method + MyGengoClient.serverExtension, 
			params : { action : 'getDate' },
			method: 'POST',
			success: successCallback,
			failure: failureCallback 
		});				
}
*/
