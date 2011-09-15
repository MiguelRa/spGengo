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
using System.Collections.Generic;
using System.Text;
using myGengo;
using myGengo.Apis;
using System.Net;
using System.Xml.Serialization;
using System.IO;
using MiguelRa.MyGengoClient.Account.Balance;
using MiguelRa.Util;
using System.Security;
using System.Collections;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Drawing;
using System.Drawing.Imaging;
using myGengo.Http;

[assembly: AllowPartiallyTrustedCallers]
namespace myGengoClient
{
    public class myGengoClient
    {
        private static string _baseUrl;
        private static string _publicKey;
        private static string _privateKey;
        private static WebProxy _proxy;
        private static string _format = "json";

        public static void initialize(string baseUrl, string apiKey, string privateKey, string format)
        {
            _baseUrl = baseUrl;
            _publicKey = apiKey;
            _privateKey = privateKey;
            _format = format;
        }

        public static void initialize(string baseUrl, string apiKey, string privateKey, string format, WebProxy proxy)
        {
            initialize(baseUrl, apiKey, privateKey, format);
            _proxy = proxy;
        }

        #region parser

        public static ApiResultGeneric ParseToApiResult(string response, string baseNamespace, string category,
            string method, string resultClassName)
        {
            // clean response (remove non-standard characters)
            response = response.Replace("&ntilde;", "ñ");

            // map to object
            string namesp = baseNamespace + "." + category + "." + Util.StringFirstCharToUpper(method);
            string className = namesp + "." + resultClassName;

            Type resultType = Type.GetType(className);
            XmlSerializer mySerializer = new XmlSerializer(resultType);
            TextReader textReader = new StringReader(response);
            object result = mySerializer.Deserialize(textReader);

            return (ApiResultGeneric)result;

        }

        public static bool CheckForError(string response)
        {
            //{\"opstat\":\"error\",\"err\":{\"code\":1150,\"msg\":\"\\\"api_key\\\" is a required field\"}}

            bool error = false; //TODO implement CheckForError(string response)


            object fullJobResponse_obj = JsonConvert.DeserializeObject(response);
            string opstat_value = (((Newtonsoft.Json.Linq.JObject)fullJobResponse_obj).Property("opstat")).Value.ToString();

            if (opstat_value == "error" || opstat_value == "\"error\"")
                error = true;

            return error;
        }

        /// <summary>
        /// Removes characters that conflict with extjs json parser.
        /// </summary>
        /// <param name="response"></param>
        /// <returns></returns>
        private static string UnescapeResponse(string response)
        {
            // unescape response
            response = response.Replace("\\", "");
            response = response.Replace("'", "");

            return response;
        }

        #endregion

        #region api methods

        #region Account

        public static string Account_BalanceRaw()
        {
            // build params
            SortedDictionary<string, object> param = new SortedDictionary<string, object>();
            param["ts"] = Util.timestamp();
            param["api_key"] = _publicKey;
            param["api_sig"] = Crypto.sign(Utils.buildQuery(param), _privateKey);

            // get client
            Account account = (Account)Api.factory("account");

            // set proxy
            account.Proxy = _proxy;

            // set baseUrl
            account.setBaseUrl(_baseUrl);

            // call method
            account.getBalance(_format, param);

            // retrieve response
            string response = account.getResponseBody();

            // unescape response
            response = myGengoClient.UnescapeResponse(response);

            // return
            return response;

        }

        public static MiguelRa.MyGengoClient.Account.Balance.ApiResult Account_BalanceOO()
        {
            // build params
            SortedDictionary<string, object> param = new SortedDictionary<string, object>();
            param["ts"] = Util.timestamp();
            param["api_key"] = _publicKey;
            param["api_sig"] = Crypto.sign(Utils.buildQuery(param), _privateKey);

            // get client
            Account account = (Account)Api.factory("account");

            // set proxy
            account.Proxy = _proxy;

            // set baseUrl
            account.setBaseUrl(_baseUrl);

            // call method
            account.getBalance(_format, param);

            // retrieve response
            string response = account.getResponseBody();

            // map to object
            string baseNamespace = "MiguelRa.MyGengoClient";
            string category = "Account";
            string method = "Balance";
            string resultClassName = "ApiResult";
            ApiResultGeneric result = ParseToApiResult(response, baseNamespace, category, method, resultClassName);

            //return
            return (MiguelRa.MyGengoClient.Account.Balance.ApiResult)result;

        }

        #endregion

        #region Translate

        #region service

        public static string Translate_Service_LanguageRaw()
        {
            // build params
            SortedDictionary<string, object> param = new SortedDictionary<string, object>();
            param["ts"] = Util.timestamp();
            param["api_key"] = _publicKey;
            param["api_sig"] = Crypto.sign(Utils.buildQuery(param), _privateKey);

            // get client
            Service client = (Service)Api.factory("service");

            // set proxy
            client.Proxy = _proxy;

            // set baseUrl
            client.setBaseUrl(_baseUrl);

            // call method
            client.getLanguages(_format, param);

            // retrieve response
            string response = client.getResponseBody();

            // unescape response
            response = myGengoClient.UnescapeResponse(response);

            //return
            return response;

        }

        public static MiguelRa.MyGengoClient.Translate.Service.Language.ApiResult Translate_Service_LanguageOO()
        {
            // build params
            SortedDictionary<string, object> param = new SortedDictionary<string, object>();
            param["ts"] = Util.timestamp();
            param["api_key"] = _publicKey;
            param["api_sig"] = Crypto.sign(Utils.buildQuery(param), _privateKey);

            // get client
            Service client = (Service)Api.factory("service");

            // set proxy
            client.Proxy = _proxy;

            // set baseUrl
            client.setBaseUrl(_baseUrl);

            // call method
            client.getLanguages(_format, param);

            // retrieve response
            string response = client.getResponseBody();

            // map to object
            string baseNamespace = "MiguelRa.MyGengoClient";
            string category = "Translate.Service";
            string method = "Language";
            string resultClassName = "ApiResult";
            ApiResultGeneric result = ParseToApiResult(response, baseNamespace, category, method, resultClassName);

            //return
            return (MiguelRa.MyGengoClient.Translate.Service.Language.ApiResult)result;

        }

        public static string Translate_Service_LanguagePairs()
        {
            // build params
            SortedDictionary<string, object> param = new SortedDictionary<string, object>();
            param["ts"] = Util.timestamp();
            param["api_key"] = _publicKey;
            param["api_sig"] = Crypto.sign(Utils.buildQuery(param), _privateKey);

            // get client
            Service client = (Service)Api.factory("service");

            // set proxy
            client.Proxy = _proxy;

            // set baseUrl
            client.setBaseUrl(_baseUrl);

            // call method
            client.getLanguagePair(_format, param);

            // retrieve response
            string response = client.getResponseBody();

            // unescape response
            response = myGengoClient.UnescapeResponse(response);

            //return
            return response;

        }

        #endregion

        #region job

        /// <summary>
        /// 
        /// </summary>
        /// <param name="type">text</param>
        /// <param name="slug">API job 1 test</param>
        /// <param name="body_src">Text to be translated goes here</param>
        /// <param name="lc_src">en</param>
        /// <param name="lc_tgt">ja</param>
        /// <param name="tier">standard</param>
        /// <param name="auto_approve">true</param>
        /// <param name="custom_data">1234567</param>
        /// <param name="comment">my comment...</param>
        /// <returns></returns>
        public static string Translate_JobsRaw(string type, string slug, string body_src, string lc_src, string lc_tgt,
            string tier, string auto_approve, string custom_data, string comment)
        {
            // build params
            SortedDictionary<string, object> param = new SortedDictionary<string, object>();
            param["ts"] = Util.timestamp();
            param["_method"] = "post";
            param["api_key"] = _publicKey;

            // * build job array
            SortedDictionary<string, object> job = new SortedDictionary<string, object>();
            job["type"] = type;
            job["slug"] = slug;
            job["body_src"] = body_src;
            job["lc_src"] = lc_src;
            job["lc_tgt"] = lc_tgt;
            job["tier"] = tier;
            job["auto_approve"] = auto_approve;
            job["custom_data"] = custom_data;
            job["comment"] = comment;

            Hashtable jobs = new Hashtable();
            jobs["job1"] = job;
            Hashtable data = new Hashtable();
            data["jobs"] = jobs;

            // * other data
            data["as_group"] = "0";
            data["process"] = "1";

            // * serialize data
            param["data"] = JsonConvert.SerializeObject(data);

            // * sign
            string enc_params = JsonConvert.SerializeObject(param);
            param["api_sig"] = Crypto.sign(enc_params, _privateKey);

            // get client
            Jobs jobs_client = (Jobs)Account.factory("jobs");

            // set proxy
            jobs_client.Proxy = _proxy;

            // set baseUrl
            jobs_client.setBaseUrl(_baseUrl);

            // call method
            jobs_client.postJobs(_format, param);

            // retrieve response
            string response = jobs_client.getResponseBody();

            // unescape response
            response = myGengoClient.UnescapeResponse(response);

            // return
            return response;

        }

        /// <summary>
        /// Retrieves a list of resources for the most recent jobs filtered by the given parameters.
        /// </summary>
        /// <param name="status">"unpaid", "available", "pending", "reviewable", "approved", "rejected", or "canceled"</param>
        /// <param name="timestamp_after">Epoch timestamp from which to filter submitted jobs.</param>
        /// <param name="count">Defaults to 10</param>
        /// <returns>{ "opstat" : "ok", "response" : { {"job_id" : 123, ctime" : ...}, {"job_id" : 425, ctime" : ...}, {"job_id" : 274, ctime" : ...}, ..., } }</returns>
        public static string Translate_Jobs_GetRaw(string status, string timestamp_after, string count)
        {
            // build params
            SortedDictionary<string, object> param = new SortedDictionary<string, object>();
            param["ts"] = Util.timestamp();
            param["api_key"] = _publicKey;

            if (!string.IsNullOrEmpty(count))
                param["count"] = count;

            if (!string.IsNullOrEmpty(status))
                param["status"] = status;

            if (!string.IsNullOrEmpty(timestamp_after))
                param["timestamp_after"] = timestamp_after;

            param["api_sig"] = Crypto.sign(Utils.buildQuery(param), _privateKey);

            // get client
            Jobs jobs_client = (Jobs)Account.factory("jobs");

            // set proxy
            jobs_client.Proxy = _proxy;

            // set baseUrl
            jobs_client.setBaseUrl(_baseUrl);

            // call method
            jobs_client.getJobs(_format, param);

            // retrieve response
            string response = jobs_client.getResponseBody();

            // unescape response
            response = myGengoClient.UnescapeResponse(response);

            // return
            return response;

        }

        /// <summary>
        /// Retrieves a specific job.
        /// </summary>
        /// <param name="jobId">ID of Job to retrieve</param>
        /// <returns></returns>
        public static string TranslateJobsGetByIdRaw(string jobId)
        {
            string response = TranslateJobsGetByIdRaw(jobId, string.Empty, false);
            return response;

        }

        /// <summary>
        /// Retrieves a specific job.
        /// </summary>
        /// <param name="jobId">ID of Job to retrieve</param>
        /// <param name="jobId">1 to obtained a field body_tgt with machine pre-translation</param>
        /// <returns></returns>
        public static string TranslateJobsGetByIdRaw(string jobId, string pre_mt, bool htmlEncode)
        {
            // build params
            SortedDictionary<string, object> param = new SortedDictionary<string, object>();
            param["ts"] = Util.timestamp();
            param["api_key"] = _publicKey;
            if (!string.IsNullOrEmpty(pre_mt))
                param["pre_mt"] = pre_mt;
            param["api_sig"] = Crypto.sign(Utils.buildQuery(param), _privateKey);

            // get client
            Job job_client = (Job)Account.factory("job");

            // set proxy
            job_client.Proxy = _proxy;

            // set baseUrl
            job_client.setBaseUrl(_baseUrl);

            // call method
            job_client.getJob(jobId, _format, param);

            // retrieve response
            string response = job_client.getResponseBody();

            //  html-encode response
            if (htmlEncode && (!myGengoClient.CheckForError(response)))
            {
                // encode body_tgt
                object fullJobResponse_obj = JsonConvert.DeserializeObject(response);
                object response_obj = (((Newtonsoft.Json.Linq.JObject)fullJobResponse_obj).Property("response")).Value;
                object job_obj = (((Newtonsoft.Json.Linq.JObject)response_obj).Property("job")).Value;
                string utfText;
                string htmlEncodedBody;
                JToken newValue;

                // * check that body_tgt is present (can be null if 'pre_mt' was '0')
                if ((((Newtonsoft.Json.Linq.JObject)job_obj).Property("body_tgt")) != null)
                {
                    utfText = (((Newtonsoft.Json.Linq.JObject)job_obj).Property("body_tgt")).Value.ToString();
                    htmlEncodedBody = Util.UnicodeToHTML(utfText);
                    newValue = new JProperty("body_tgt", htmlEncodedBody);
                    (((Newtonsoft.Json.Linq.JObject)job_obj).Property("body_tgt")).Replace(newValue);
                }

                // encode body_src
                utfText = (((Newtonsoft.Json.Linq.JObject)job_obj).Property("body_src")).Value.ToString();
                htmlEncodedBody = Util.UnicodeToHTML(utfText);
                newValue = new JProperty("body_src", htmlEncodedBody);
                (((Newtonsoft.Json.Linq.JObject)job_obj).Property("body_src")).Replace(newValue);

                // encode slug
                utfText = (((Newtonsoft.Json.Linq.JObject)job_obj).Property("slug")).Value.ToString();
                htmlEncodedBody = Util.UnicodeToHTML(utfText);
                newValue = new JProperty("slug", htmlEncodedBody);
                (((Newtonsoft.Json.Linq.JObject)job_obj).Property("slug")).Replace(newValue);

                // return encoded response
                response = fullJobResponse_obj.ToString();
            }

            // unescape response
            response = myGengoClient.UnescapeResponse(response);

            // return
            return response;

        }

        #endregion

        #endregion

        #endregion

        /// <summary>
        /// Returns jobs for current user (with full details).
        /// </summary>
        /// <param name="status"></param>
        /// <param name="timestamp_after"></param>
        /// <param name="count"></param>
        /// <returns>{\"opstat\":\"ok\",\"response\":[{\"job_id\":\"16215\",\"slug\":\"Un texto para traducir\",\"body_src\":\"Un texto\",\"lc_src\":\"en\",\"lc_tgt\":\"es\",\"unit_count\":\"2\",\"tier\":\"standard\",\"credits\":\"0.40\",\"status\":\"reviewable\",\"eta\":\"\",\"ctime\":1298225044499,\"callback_url\":\"\",\"auto_approve\":\"0\",\"custom_data\":\"\"}]}</returns>
        public static string GetMyJobs(string status, string timestamp_after, string count, bool lazyLoad)
        {
            // get light jobs from api
            string lazyJobsResponse = myGengoClient.Translate_Jobs_GetRaw(status, timestamp_after, count);
            //string lazyJobsResponse = "{\"opstat\":\"ok\",\"response\":[{\"ctime\":1298051354,\"job_id\":\"16215\"}]}";

            if (myGengoClient.CheckForError(lazyJobsResponse))
                return lazyJobsResponse;

            object lazyJobs_obj = JsonConvert.DeserializeObject(lazyJobsResponse);
            JArray array = (JArray)(((Newtonsoft.Json.Linq.JObject)lazyJobs_obj).Property("response")).Value;

            // get full jobs from api
            string jobId;
            string fullJobResponse;
            object fullJobResponse_obj;
            object response_obj;
            string jobPayload;
            string jobPayloads = string.Empty;
            int cursor = 0;
            object job_obj;
            JToken newValue;
            foreach (JObject lazyJob in array)
            {
                // get job details from api
                jobId = lazyJob.Property("job_id").Value.ToString();
                jobId = jobId.Replace("\"", "");
                fullJobResponse = myGengoClient.TranslateJobsGetByIdRaw(jobId);
                if (myGengoClient.CheckForError(lazyJobsResponse))
                    return fullJobResponse;               

                // extract job payload
                fullJobResponse_obj = JsonConvert.DeserializeObject(fullJobResponse);
                response_obj = (((Newtonsoft.Json.Linq.JObject)fullJobResponse_obj).Property("response")).Value;
               
                // remove body_src if is lazy loading
                if (lazyLoad)
                {  
                    job_obj = (((Newtonsoft.Json.Linq.JObject)response_obj).Property("job")).Value;                    
                    newValue = new JProperty("body_src", string.Empty);
                    (((Newtonsoft.Json.Linq.JObject)job_obj).Property("body_src")).Replace(newValue);

                }               

                // original
                //**
                jobPayload = ((JObject)response_obj).Property("job").Value.ToString();
                jobPayloads += jobPayload;
                //**

                if (cursor < (array.Count - 1))
                    jobPayloads += ",";

                cursor++;

            }

            string response = "{" + string.Format("\"opstat\":\"ok\",\"response\":[{0}]", jobPayloads) + "}";
            return response;

        }

        /// <summary>
        /// Get preview image for a job and saves it to disk.
        /// </summary>
        /// <param name="jobId"></param>
        /// <param name="imagePathToSave"></param>
        /// <returns></returns>
        public static bool TranslateJobGetPreview(string jobId, string imagePathToSave)
        {
            // build params
            SortedDictionary<string, object> param = new SortedDictionary<string, object>();
            param["ts"] = Util.timestamp();
            param["api_key"] = _publicKey;
            param["api_sig"] = Crypto.sign(Utils.buildQuery(param), _privateKey);

            // get client
            Job job_client = (Job)Account.factory("job");

            // set proxy
            job_client.Proxy = _proxy;

            // set baseUrl
            job_client.setBaseUrl(_baseUrl);

            // call method
            job_client.previewJob(jobId, _format, param);

            // retrieve response
            Stream responseStream = job_client.getResponseStream();
            Image image = Image.FromStream(responseStream);
            image.Save(imagePathToSave, ImageFormat.Jpeg);

            // unescape response
            // -

            // return
            return true;

        }

        /// <summary>
        /// Returns a job's original text and a translation preview image (saves image to disk).
        /// </summary>
        /// <param name="jobId"></param>
        /// <returns></returns>
        public static string GetJobPreview(string jobId, string imagePathToSave, string imagePathPrefix)
        {
            // get job text
            string jobDetails_str = myGengoClient.TranslateJobsGetByIdRaw(jobId);
            if (myGengoClient.CheckForError(jobDetails_str))
                return jobDetails_str;
            object fullJobResponse_obj = JsonConvert.DeserializeObject(jobDetails_str);
            JObject response_obj = (JObject)(((Newtonsoft.Json.Linq.JObject)fullJobResponse_obj).Property("response")).Value;
            JObject jobPayload = (JObject)((JObject)response_obj).Property("job").Value;
            string body_src = jobPayload.Property("body_src").Value.ToString();

            // get translation preview image            
            bool previewSavedOk = myGengoClient.TranslateJobGetPreview(jobId, imagePathToSave);

            // extract image filename and prefix path
            FileInfo f = new FileInfo(imagePathToSave);
            string fileName = f.Name;
            if (!string.IsNullOrEmpty(imagePathPrefix))
                fileName = imagePathPrefix + fileName;

            // build json response
            string jodPayload = "{" + string.Format("\"job_id\": \"{0}\",\"body_src\": {1},\"imagePreview\": \"{2}\"", jobId, body_src, fileName) + "}";
            string response = "{" + string.Format("\"opstat\":\"ok\",\"response\":{0}", jodPayload) + "}";
            return response;

        }

        public static string TranslateJobApprove(string jobId, string rating)
        {
            // build params
            SortedDictionary<string, object> param = new SortedDictionary<string, object>();
            param["ts"] = Util.timestamp();
            param["_method"] = "put";
            param["api_key"] = _publicKey;

            // * build data array                       
            SortedDictionary<string, object> action = new SortedDictionary<string, object>();
            action.Add("action", "approve");
            if (!string.IsNullOrEmpty(rating))
                action.Add("rating", rating);

            // * serialize data
            param["data"] = JsonConvert.SerializeObject(action);

            // * sign
            string enc_params = JsonConvert.SerializeObject(param);
            param["api_sig"] = Crypto.sign(enc_params, _privateKey);

            // get client
            Job job_client = (Job)Account.factory("job");

            // set proxy
            job_client.Proxy = _proxy;

            // set baseUrl
            job_client.setBaseUrl(_baseUrl);

            // call method
            job_client.putApprove(jobId, _format, param);

            // retrieve response
            string response = job_client.getResponseBody();

            // unescape response
            response = myGengoClient.UnescapeResponse(response);

            // return
            return response;
        }

        public static string TranslateJobCancel(string jobId)
        {
            // build params
            SortedDictionary<string, object> param = new SortedDictionary<string, object>();
            param["ts"] = Util.timestamp();
            param["_method"] = "delete";
            param["api_key"] = _publicKey;

            // * sign
            param["api_sig"] = Crypto.sign(Utils.buildQuery(param), _privateKey);

            /*
            //*******

            // build params
            SortedDictionary<string, object> param = new SortedDictionary<string, object>();
            param["ts"] = Util.timestamp();
            param["api_key"] = _publicKey;
            if (!string.IsNullOrEmpty(pre_mt))
                param["pre_mt"] = pre_mt;
            param["api_sig"] = Crypto.sign(Utils.buildQuery(param), _privateKey);

            //*******
             * 
             * */

            // get client
            Job job_client = (Job)Account.factory("job");

            // set proxy
            job_client.Proxy = _proxy;

            // set baseUrl
            job_client.setBaseUrl(_baseUrl);

            // call method
            job_client.deleteJob(jobId, _format, param);

            // retrieve response
            string response = job_client.getResponseBody();

            // unescape response
            response = myGengoClient.UnescapeResponse(response);

            // return
            return response;
        }

    }

}
