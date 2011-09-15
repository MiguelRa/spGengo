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
Common code. 
Tasks: 
- Provide Constants
- Provide common methods.
*/

//*** Settings ***
var TIMEOUT = 300000;
var DEBUG = true;
var HEIGHT_LOADING_PANEL = 13;
var COPYRIGHT_NOTICE = 'Copyright (c) 2011 <a class="textFooter" href="mailto:mramosr85@gmail.com">Miguel A. Ramos</a>. All Rights Reserved. | <a href="http://mygengo.com/translate/" target="_blank"> <img class="imageFooter" src="~/_wpresources/MiguelRa.spGengo/spGengo/images/mygengo_powered.png" /> </a>';

//*** URLs ****
var URL_BASE = "~/_wpresources/MiguelRa.spGengo/spGengo/";

function getUrl(filePath)
{
    return URL_BASE + filePath;
}

//*** User Messages ****
// * errors
var TEXT_ERROR = "Error";
var TEXT_ERROR_TYPE_CONNECTION = "Request Error";
var TEXT_ERROR_MESSAGE_CONNECTION = "Request failed."
var TEXT_ERROR_TYPE_API = "API Error";
var TEXT_ERROR_TYPE_PARSING = "Parsing Error"
var TEXT_ERROR_MESSAGE_PARSING = "Bad response."
var TEXT_ERROR_TYPE_SERVER = "Server Error";
var TEXT_ERROR_MESSAGE_SERVER = "Server error.";

// * infos
var TEXT_INFO_ORDER_OK = "Order posted OK.";
var TEXT_INFO_LOGIN_OK = "Login OK.";
var TEXT_INFO_LOGOFF_OK = "Log off OK.";
var TEXT_INFO_REFRESH_OK = "Update OK.";
var TEXT_INFO_APPROVED_OK = "Approval OK."
var TEXT_INFO_CANCEL_OK = "Cancellation OK.";
var TEXT_INFO_NEW_JOB_ID = "Job #";

// * warnings
var TEXT_WARNING_EMPTY_FIELD = "Field can't be empty";

// * ui labels
var TEXT_UI_YOUR_CREDITS = "Your Credits";

//**** Job Status ****
var JOB_STATUS_AVAILABLE = "available";
var JOB_STATUS_PENDING = "pending";
var JOB_STATUS_REVIEWABLE = "reviewable";
var JOB_STATUS_REVISING = "revising";
var JOB_STATUS_APPROVED = "approved";
var JOB_STATUS_CANCELLED = "cancelled";
var JOB_STATUS_HELD = "held";

var JOB_STATUS_AVAILABLE_FRIENDLY = "Awaiting <br /> translator";
var JOB_STATUS_AVAILABLE_FRIENDLY_1 = "Awaiting translator";
var JOB_STATUS_PENDING_FRIENDLY = "Translating";
var JOB_STATUS_REVIEWABLE_FRIENDLY = "Reviewable";
var JOB_STATUS_APPROVED_FRIENDLY = "Approved";
var JOB_STATUS_CANCELLED_FRIENDLY = "Cancelled";
var JOB_STATUS_REVISING_FRIENDLY = "Revising";
var JOB_STATUS_HELD_FRIENDLY = "Rejected, Pending Review";

//**** Tiers ****
var TIER_STANDARD = "standard";
var TIER_PRO = "pro";
var TIER_ULTRA = "ultra";
var TIER_MACHINE = "machine";