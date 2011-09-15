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

using System;
using System.Runtime.InteropServices;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Xml.Serialization;

using Microsoft.SharePoint;
using Microsoft.SharePoint.WebControls;
using Microsoft.SharePoint.WebPartPages;
using System.Security;
using System.Web.UI.HtmlControls;

[assembly: AllowPartiallyTrustedCallers]
namespace MiguelRa.spGengo
{
    [Guid("cca551ce-4217-4e03-ac12-1671a05ba531")]
    public class spGengo : System.Web.UI.WebControls.WebParts.WebPart
    {
        private Image myImage;
        private Label label;
        TextBox texboxAjax;
        // Button buton

        public spGengo()
        {
            this.ExportMode = WebPartExportMode.All;

        }

        protected override void Render(HtmlTextWriter writer)
        {
            /* Compact square layout
            writer.Write("<table width=\"100%\">");
            writer.Write("<tr>");
            writer.Write("<td id=\"credits\" align=\"right\" valign=\"top\">");
            writer.Write("Your- Credits: ---"); 
            //writer.Write("<div id=\"credits\">Your!! Credits: ---</div>");                       
            writer.Write("</td>");
            writer.Write("<td id=\"regionRefresh\" width=\"30\" align=\"left\" valign=\"top\">");
            //writer.Write("<div id=\"regionRefresh\" class=\"regionRefresh\"> </div>");
            writer.Write("</td>");
            writer.Write("<td id=\"regionButtons\" width=\"90\" align=\"right\" valign=\"top\">");
            //writer.Write("<div id=\"regionButtons\" class=\"regionButtons\">");
            writer.Write("</td>");
            writer.Write("</tr>");
            writer.Write("</table>");
           
            writer.Write("<br/>");
            writer.Write("<div id=\"notification\" class=\"errorPanel\">notification</div>");
            writer.Write("<div id=\"loadingPanel\"></div>");
            */

            //* wide layout
            // begin table
            writer.Write("<table align=\"right\" >");
            // row 0: logo
            writer.Write("<tr>");
            writer.Write("<td colspan=\"3\" id=\"logo\" align=\"left\" class=\"normalText\" >");
            writer.Write("<img src=\"~/_wpresources/MiguelRa.spGengo/spGengo/images/logo.gif\">");
            writer.Write("<img src=\"~/_wpresources/MiguelRa.spGengo/ext.js/images/default/shared/loading-balls.gif\">");
            writer.Write("</td>");
            writer.Write("</tr>");
            // row 1: Credits
            writer.Write("<tr>");
            writer.Write("<td colspan=\"2\" id=\"credits\" align=\"left\" class=\"normalText\" >");
            writer.Write("</td>");
            writer.Write("<td id=\"regionRefresh\" align=\"right\" valign=\"top\">");
            writer.Write("</td>");
            writer.Write("</tr>");
            // row 2: Buttons
            writer.Write("<tr>");
            writer.Write("<td id=\"regionButtons1\" width=\"30\" align=\"right\" valign=\"top\">");
            writer.Write("</td>");
            writer.Write("<td id=\"regionButtons2\" width=\"30\" align=\"right\" valign=\"top\">");
            writer.Write("</td>");
            writer.Write("<td id=\"regionButtons3\" width=\"30\" align=\"right\" valign=\"top\">");
            writer.Write("</td>");
            writer.Write("</tr>");
            // row 3: Notifications
            writer.Write("<tr>");
            writer.Write("<td align=\"right\" valign=\"top\" colspan=\"3\">");
            writer.Write("<div id=\"loadingPanel\"></div>");
            writer.Write("<div id=\"notification\"></div>");
            writer.Write("<div id=\"powered\"></div>");
            writer.Write("</td>");
            writer.Write("</tr>");
            // end table
            writer.Write("</table>");

            //writer.Write("<br/>");
            //writer.Write("<div id=\"notification\" class=\"errorPanel\">notification</div>");
            //writer.Write("<div id=\"loadingPanel\"></div>");

        }

        protected override void CreateChildControls()
        {
            // add scripts
            string scriptUIUrl = "~/_wpresources/MiguelRa.spGengo/spGengo/js/custom_view.js";
            string scriptEventHandlerUrl = "~/_wpresources/MiguelRa.spGengo/spGengo/js/custom_controller.js";
            string scriptApiMethodUrl = "~/_wpresources/MiguelRa.spGengo/spGengo/js/custom_api.js";
            string scriptMessagesUrl = "~/_wpresources/MiguelRa.spGengo/spGengo/js/custom_common.js";
            string scriptBase = "~/_wpresources/MiguelRa.spGengo/ext.js/js/adapter/ext/ext-base.js";
            string scriptAll = "~/_wpresources/MiguelRa.spGengo/ext.js/js/ext-all.js";
            string scriptLang = "~/_wpresources/MiguelRa.spGengo/ext.js/js/ext-lang-es.js";

            Page.ClientScript.RegisterClientScriptInclude("ext-base.js", scriptBase);
            Page.ClientScript.RegisterClientScriptInclude("ext-all.js", scriptAll);
            Page.ClientScript.RegisterClientScriptInclude("ext-lang-es.js", scriptLang);
            Page.ClientScript.RegisterClientScriptInclude("custom_common.js", scriptMessagesUrl);
            Page.ClientScript.RegisterClientScriptInclude("custom_api.js", scriptApiMethodUrl);
            Page.ClientScript.RegisterClientScriptInclude("custom_view.js", scriptUIUrl);
            Page.ClientScript.RegisterClientScriptInclude("custom_controller.js", scriptEventHandlerUrl);

            // add css
            string ccs = "~/_wpresources/MiguelRa.spGengo/ext.js/css/ext-all.css";
            HtmlLink ccsLink = new HtmlLink();
            ccsLink.Attributes.Add("rel", "stylesheet");
            ccsLink.Attributes.Add("type", "text/css");
            ccsLink.Href = ccs;
            Page.Header.Controls.Add(ccsLink);

            ccs = "~/_wpresources/MiguelRa.spGengo/spGengo/css/custom_style.css";
            ccsLink = new HtmlLink();
            ccsLink.Attributes.Add("rel", "stylesheet");
            ccsLink.Attributes.Add("type", "text/css");
            ccsLink.Href = ccs;
            Page.Header.Controls.Add(ccsLink);

        }
    }
}
