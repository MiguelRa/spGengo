/**
 * Copyright (c) 2011 Miguel A. Ramos 
 * (mramosr85@gmail.com)
 *
 * This file is part of MiguelRa.Util.
 *
 * MiguelRa.Util is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * MiguelRa.Util is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License
 * along with MiguelRa.Util.  If not, see <http://www.gnu.org/licenses/>.
 */

using System;
using System.Collections.Generic;
using System.Text;
using System.IO;
using System.Xml;
using System.Net;
using System.Collections;
using System.Security;

[assembly: AllowPartiallyTrustedCallers]
namespace MiguelRa.Util
{
    public class Util
    {
        public static string StringFirstCharToUpper(string text)
        {
            if (string.IsNullOrEmpty(text))
                throw new Exception();

            string firstCharUpper = Char.ToUpper(text[0]).ToString();
            string theRest = text.Substring(1);
            string result = string.Format("{0}{1}", firstCharUpper, theRest);

            return result;
        }

        public static string StringRemoveFirstAppearance(string stringContainingAppearances, string substringToRemove)
        {
            if (string.IsNullOrEmpty(stringContainingAppearances))
                throw new Exception("Argument null");

            int pos = stringContainingAppearances.IndexOf(substringToRemove);
            if (pos >= 0)
                stringContainingAppearances = stringContainingAppearances.Remove(pos, substringToRemove.Length);

            return stringContainingAppearances;
        }

        public static bool StringIsNumber(string value)
        {
            int result;
            bool isNumber = int.TryParse(value, out result);
            return isNumber;
        }

        public static string StringReplaceMultiple(string text, string[] oldStrings, string[] newStrings)
        {
            // replace text      
            if ((oldStrings != null) && (newStrings != null))
            {
                if (oldStrings.Length != newStrings.Length)
                    throw new Exception("OldStrings array and NewStrings array must have the same length.");

                int i = 0;
                foreach (string oldString in oldStrings)
                {
                    text = text.Replace(oldString, newStrings[i]);
                    i++;
                }
            }

            return text;
        }

        public static string FileLoadFileAsText(string filename)
        {
            TextReader textReader = new StreamReader(filename);
            string content = textReader.ReadToEnd();
            textReader.Close();

            return content;
        }

        public static bool FileSaveFileText(string text, string filename)
        {
            StreamWriter streamWriter = File.CreateText(filename);
            streamWriter.Write(text);
            streamWriter.Flush();
            streamWriter.Close();

            return true;
        }

        public static bool FileCopyFilesBetweenDirectories(string directoryFrom, string directoryTo, bool recursive, bool overwrite)
        {
            DirectoryInfo directory = new DirectoryInfo(directoryFrom);

            // * copy files
            foreach (FileInfo file in directory.GetFiles())
                file.CopyTo(directoryTo + file.Name, overwrite);

            // * copy folders and subfolders with its content
            string path = string.Empty;
            DirectoryInfo newFolder = null;
            foreach (DirectoryInfo folder in directory.GetDirectories())
            {
                newFolder = Directory.CreateDirectory(directoryTo + folder.Name);
                if (recursive)
                    FileCopyFilesBetweenDirectories(folder.FullName + "/", newFolder.FullName + "/", recursive, overwrite);
            }

            return true;
        }

        public static Dictionary<string, XmlNodeList> XmlGetRepeatedTagsFromXml(XmlDocument xml)
        {
            //XmlNode rootElement = xml.DocumentElement;
            Dictionary<string, XmlNodeList> repeatedTags = new Dictionary<string, XmlNodeList>();

            List<string> tagNames = XmlGetTagNamesFromXml(xml);
            XmlNodeList nodes = null;
            foreach (string tagName in tagNames)
            {
                nodes = xml.GetElementsByTagName(tagName);
                if (nodes != null && nodes.Count > 1)
                {
                    repeatedTags.Add(tagName, nodes);
                }
            }

            return repeatedTags;

        }

        public static List<string> XmlGetTagNamesFromXml(XmlNode xml)
        {
            List<string> tagNames = new List<string>();

            foreach (XmlNode node in xml.ChildNodes)
            {
                if (!tagNames.Contains(node.LocalName))
                    tagNames.Add(node.LocalName);

                // if element has children get nested tags
                if (XmlNodeIsCompound(node))
                {
                    List<string> nestedTagNames = XmlGetTagNamesFromXml(node);
                    foreach (string tagName in nestedTagNames)
                        if (!tagNames.Contains(tagName))
                            tagNames.Add(tagName);

                }
            }

            return tagNames;
        }

        public static bool XmlNodeIsCompound(XmlNode node)
        {
            return (node.ChildNodes != null && node.ChildNodes.Count > 1);
        }
       
        public static string timestamp()
        {
            TimeSpan t = (DateTime.UtcNow - new DateTime(1970, 1, 1));
            return ((ulong)t.TotalSeconds).ToString();
        }

        /// <summary>
        /// Converts a Unicode string to a HTML encoded string. HTML encoded string
        /// displays correctly in web browsers.
        /// </summary>
        /// <param name="unicodeText">Unicode string (e.g: 'aplicaci\u00f3n')</param>
        /// <returns>HTML encoded string (e.g: 'aplicaci&#243;n')</returns>
        public static string UnicodeToHTML(string unicodeText)
        {
            int unicodeVal;
            string encoded = "";
            foreach (char c in unicodeText)
            {
                unicodeVal = c;
                if ((c >= 49) && (c <= 122))
                {
                    // in 'ascii' range x30 to x7a which is 0-9A-Za-z plus some punctuation
                    encoded += c;	// leave as-is
                }
                else
                { // outside 'ascii' range - encode
                    encoded += string.Concat("&#",
                        unicodeVal.ToString(System.Globalization.NumberFormatInfo.InvariantInfo), ";");
                }
            }
            return encoded;
        }
        

    }
}
