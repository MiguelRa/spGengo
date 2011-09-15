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
using System.Diagnostics;

namespace MiguelRa.Util
{
    public class ToolLauncher
    {
        public static bool Run(string exeName, string argsLine, int timeoutSeconds, out string output)
        {
            StreamReader outputStream = StreamReader.Null;            
            bool success = false;

            try
            {
                Process newProcess = new Process();
                newProcess.StartInfo.FileName = exeName;
                newProcess.StartInfo.Arguments = argsLine;
                newProcess.StartInfo.UseShellExecute = false;
                newProcess.StartInfo.CreateNoWindow = true;
                newProcess.StartInfo.RedirectStandardOutput = true;
                newProcess.Start();

                if (0 == timeoutSeconds)
                {
                    outputStream = newProcess.StandardOutput;
                    output = outputStream.ReadToEnd();
                    newProcess.WaitForExit();
                }
                else
                {
                    success = newProcess.WaitForExit(timeoutSeconds * 1000);
                }

                if (success)
                {
                    outputStream = newProcess.StandardOutput;
                    output = outputStream.ReadToEnd();
                }
                else
                {
                    output = "Timed out at " + timeoutSeconds + " seconds waiting for " + exeName + " to exit.";
                }

            }
            catch (Exception e)
            {
                throw (new Exception("An error occurred while running " + exeName + ".", e));
            }
            finally
            {
                outputStream.Close();
            }

            return success;

        }

    }
}
