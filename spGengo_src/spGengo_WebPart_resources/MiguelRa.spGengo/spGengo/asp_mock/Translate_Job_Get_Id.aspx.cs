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
using System.Configuration;
using System.Data;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Net;
using System.Xml;
using System.IO;
using System.Threading;
using System.Text;

public partial class _Default : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string response = string.Empty;
        // debug?
        bool debug = Convert.ToBoolean(ConfigurationManager.AppSettings["spGengo_debug"]);

        try
        {
            // fake server error
            //throw new NullReferenceException();

            // fake delay
            int delay = int.Parse(ConfigurationManager.AppSettings["spGengo_delay"]);
            Thread.Sleep(delay);

            // fake response
            // * a fake response is in "[pagename].aspx.txt" file. 
            System.IO.FileInfo fileInfo = new FileInfo(Request.PhysicalPath);
            string pageName = fileInfo.Name;
            string parentFolder = System.IO.Directory.GetParent(Request.PhysicalPath).FullName;
            string responsePath = parentFolder + "/" + pageName + ".txt";
            TextReader textReader = new StreamReader(responsePath);
            response = textReader.ReadToEnd();
            textReader.Close();

            // fake api error            
            //response = "{\"opstat\":\"error\",\"err\":{\"code\":1150,\"msg\":\"'api_key' is a required field\"}}";
            
            // unescape response            
            response = response.Replace("\\", "");

            // return response
            Response.Write(response);
        }
        catch (Exception ex)
        {
            // return server error
            string debugInfo = string.Empty;
            if (debug)
            {
                debugInfo = "Message: " + ex.Message + "<br />" + "Type: " + ex.GetType().Name + "<br />" + "Source: " + ex.Source;
            }
            response = "{\"opstat\" : \"serverError\", \"response\" : \"" + debugInfo + "\"}"; 

            // unescape response
            response = response.Replace("\\", "");

            // return
            Response.Write(response);

        }

    }

}
