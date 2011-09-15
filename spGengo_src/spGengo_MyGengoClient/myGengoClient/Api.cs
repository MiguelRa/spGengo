/**
 * myGengo API Client
 *
 * LICENSE
 *
 * This source file is subject to the new BSD license that came
 * with this package in the file LICENSE.txt. It is also available 
 * through the world-wide-web at this URL:
 * http://mygengo.com/services/api/dev-docs/mygengo-code-license
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to contact@mygengo.com so we can send you a copy immediately.
 *
 * @category   myGengo
 * @package    API Client Library
 * @copyright  Copyright (c) 2009-2010 myGengo, Inc. (http://mygengo.com)
 * @license    http://mygengo.com/services/api/dev-docs/mygengo-code-license New BSD License
 */

using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using myGengo.Apis;
using System.Net;
using System.IO;
using MiguelRa.Util;
using myGengo.Http;
namespace myGengo
{
    abstract class Api
    {
        protected string _baseUrl = "http://api.sandbox.mygengo.com/v1/";
        protected string _apiKey;
        protected string _privateKey;
        protected string _format;
        protected WebProxy _proxy;

        protected string _defaultJobId; //TODO este atributo debe irse


        protected HttpWebResponse response = null;
        protected Client client = null;
        protected string DEFAULT_ID = "0";
        /**
         * we will have 2 constructors
         */
        public Api(string api_key, string private_key)
        {
            client = Client.getInstance();
            client.Proxy = _proxy;
            _apiKey = api_key;
            _privateKey = private_key;
        }

        public Api()
        {
            client = Client.getInstance();
            client.Proxy = _proxy;
        }

        public WebProxy Proxy
        {
            get { return _proxy; }
            set
            {
                _proxy = value;
                if (client != null)
                {
                    client.Proxy = _proxy;
                }
            }
        }

        public void setResponseFormat(string format)
        {
            format = format.ToLower();
            string[] valid = { "xml", "json" };
            if (!valid.Contains(format))
            {
                throw new GengoException("Invalid response format: " + format + ", accepted formats are: xml or json.");
            }
            _format = format;
        }

        public void setBaseUrl(string url)
        {
            if (!url.EndsWith("/"))
            {
                url = url + "/";
            }
            _baseUrl = url;
        }

        protected void checkResponse()
        {
            if (response == null)
            {
                throw new GengoException("A valid response is not yet available, please make a request first.");
            }
        }

        public override string ToString()
        {
            return response.ToString();
        }

        /**
        * @param string client The name of the clinet to instantiate (job, jobs, account or service)
        * @param string api_key user api key
        * @param string private_key user secret key
        * @return A myGengo Api client
        */
        public static Api factory(string client)
        {
            return factory(client, null, null);
        }
        public static Api factory(string client, string api_key, string private_key)
        {
            switch (client)
            {
                case "account":
                    return new Account(api_key, private_key);
                case "job":
                    return new Job(api_key, private_key);
                case "jobs":
                    return new Jobs(api_key, private_key);
                case "service":
                    return new Service(api_key, private_key);

            }
            throw new GengoException("Invalid client: " + client + ", accepted clients are: job,jobs,account and service.");
        }

        /**
        * Set the passed parameters that are null with default
        * configuration values
        */
        protected void setParams(ref object id, ref string format, ref IDictionary param)
        {
            if (id == null)
            {
                id = _defaultJobId;
            }
            if (format == null)
            {
                format = _format;
            }
            if (param == null)
            {
                param = new SortedDictionary<string, object>();
                string private_key = _privateKey;
                param["ts"] = Util.timestamp();
                param["api_key"] = _apiKey;
                string query = Utils.buildQuery(param);
                param["api_sig"] = Crypto.sign(query, private_key);
            }
        }
        protected void setParamsNotId(ref string format, ref IDictionary param)
        {
            object foo_id = new object();
            setParams(ref foo_id, ref format, ref param);
        }

        public string getResponseBody()
        {
            checkResponse();
            return new StreamReader(response.GetResponseStream()).ReadToEnd();
        }

        public Stream getResponseStream()
        {
            checkResponse();

            StreamReader streamReader = new StreamReader(response.GetResponseStream());
            Stream stream  = streamReader.BaseStream;
            //streamReader.Close();

            return stream;
        }

    }
}
