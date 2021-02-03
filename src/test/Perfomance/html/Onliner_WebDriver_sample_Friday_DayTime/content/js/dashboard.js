/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 70.0, "KoPercent": 30.0};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.0, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.0, 500, 1500, "jp@gc - WebDriver Sampler"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 20, 6, 30.0, 19909.750000000004, 7577, 39037, 17473.5, 34586.3, 38822.85, 39037.0, 0.17471979313176492, 166.68801467264063, 0.0], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["jp@gc - WebDriver Sampler", 20, 6, 30.0, 19909.750000000004, 7577, 39037, 17473.5, 34586.3, 38822.85, 39037.0, 0.17471979313176492, 166.68801467264063, 0.0], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["500/Sourced file: inline evaluation of: ``import org.apache.commons.io.FileUtils; import org.openqa.selenium.*; import org . . . '' : Method Invocation click : at Line: 18 : in file: inline evaluation of: ``import org.apache.commons.io.FileUtils; import org.openqa.selenium.*; import org . . . '' : .click ( ) \\n\\nTarget exception: org.openqa.selenium.ElementNotInteractableException: element not interactable\\n  (Session info: chrome=87.0.4280.141)\\nBuild info: version: '3.14.0', revision: 'aacccce0', time: '2018-08-02T20:19:58.91Z'\\nSystem info: host: 'DESKTOP-7B2EO79', ip: '192.168.100.7', os.name: 'Windows 10', os.arch: 'amd64', os.version: '10.0', java.version: '1.8.0_241'\\nDriver info: org.openqa.selenium.chrome.ChromeDriver\\nCapabilities {acceptInsecureCerts: false, browserName: chrome, browserVersion: 87.0.4280.141, chrome: {chromedriverVersion: 86.0.4240.22 (398b0743353ff..., userDataDir: C:\\\\Users\\\\Eugene\\\\AppData\\\\Loc...}, goog:chromeOptions: {debuggerAddress: localhost:64673}, javascriptEnabled: true, networkConnectionEnabled: false, pageLoadStrategy: normal, platform: WINDOWS, platformName: WINDOWS, proxy: Proxy(system), setWindowRect: true, strictFileInteractability: false, timeouts: {implicit: 0, pageLoad: 300000, script: 30000}, unhandledPromptBehavior: dismiss and notify, webauthn:virtualAuthenticators: true}\\nSession ID: 8e581ccd30adbb321a6bca81c8e77d8d\\n in inline evaluation of: ``import org.apache.commons.io.FileUtils; import org.openqa.selenium.*; import org . . . '' at line number 18", 1, 16.666666666666668, 5.0], "isController": false}, {"data": ["500/javascript error: Cannot read property 'outerHTML' of null\\n  (Session info: chrome=87.0.4280.141)\\nBuild info: version: '3.14.0', revision: 'aacccce0', time: '2018-08-02T20:19:58.91Z'\\nSystem info: host: 'DESKTOP-7B2EO79', ip: '192.168.100.7', os.name: 'Windows 10', os.arch: 'amd64', os.version: '10.0', java.version: '1.8.0_241'\\nDriver info: org.openqa.selenium.chrome.ChromeDriver\\nCapabilities {acceptInsecureCerts: false, browserName: chrome, browserVersion: 87.0.4280.141, chrome: {chromedriverVersion: 86.0.4240.22 (398b0743353ff..., userDataDir: C:\\\\Users\\\\Eugene\\\\AppData\\\\Loc...}, goog:chromeOptions: {debuggerAddress: localhost:64858}, javascriptEnabled: true, networkConnectionEnabled: false, pageLoadStrategy: normal, platform: WINDOWS, platformName: WINDOWS, proxy: Proxy(system), setWindowRect: true, strictFileInteractability: false, timeouts: {implicit: 0, pageLoad: 300000, script: 30000}, unhandledPromptBehavior: dismiss and notify, webauthn:virtualAuthenticators: true}\\nSession ID: e41cae6c196a4625eb4692ac287d5a1d", 1, 16.666666666666668, 5.0], "isController": false}, {"data": ["500/Sourced file: inline evaluation of: ``import org.apache.commons.io.FileUtils; import org.openqa.selenium.*; import org . . . '' : Method Invocation click : at Line: 18 : in file: inline evaluation of: ``import org.apache.commons.io.FileUtils; import org.openqa.selenium.*; import org . . . '' : .click ( ) \\n\\nTarget exception: org.openqa.selenium.ElementNotInteractableException: element not interactable\\n  (Session info: chrome=87.0.4280.141)\\nBuild info: version: '3.14.0', revision: 'aacccce0', time: '2018-08-02T20:19:58.91Z'\\nSystem info: host: 'DESKTOP-7B2EO79', ip: '192.168.100.7', os.name: 'Windows 10', os.arch: 'amd64', os.version: '10.0', java.version: '1.8.0_241'\\nDriver info: org.openqa.selenium.chrome.ChromeDriver\\nCapabilities {acceptInsecureCerts: false, browserName: chrome, browserVersion: 87.0.4280.141, chrome: {chromedriverVersion: 86.0.4240.22 (398b0743353ff..., userDataDir: C:\\\\Users\\\\Eugene\\\\AppData\\\\Loc...}, goog:chromeOptions: {debuggerAddress: localhost:64224}, javascriptEnabled: true, networkConnectionEnabled: false, pageLoadStrategy: normal, platform: WINDOWS, platformName: WINDOWS, proxy: Proxy(system), setWindowRect: true, strictFileInteractability: false, timeouts: {implicit: 0, pageLoad: 300000, script: 30000}, unhandledPromptBehavior: dismiss and notify, webauthn:virtualAuthenticators: true}\\nSession ID: 59f734cc1e9a1b3a43999af5271a1c8b\\n in inline evaluation of: ``import org.apache.commons.io.FileUtils; import org.openqa.selenium.*; import org . . . '' at line number 18", 1, 16.666666666666668, 5.0], "isController": false}, {"data": ["500/Sourced file: inline evaluation of: ``import org.apache.commons.io.FileUtils; import org.openqa.selenium.*; import org . . . '' : Method Invocation click : at Line: 18 : in file: inline evaluation of: ``import org.apache.commons.io.FileUtils; import org.openqa.selenium.*; import org . . . '' : .click ( ) \\n\\nTarget exception: org.openqa.selenium.ElementNotInteractableException: element not interactable\\n  (Session info: chrome=87.0.4280.141)\\nBuild info: version: '3.14.0', revision: 'aacccce0', time: '2018-08-02T20:19:58.91Z'\\nSystem info: host: 'DESKTOP-7B2EO79', ip: '192.168.100.7', os.name: 'Windows 10', os.arch: 'amd64', os.version: '10.0', java.version: '1.8.0_241'\\nDriver info: org.openqa.selenium.chrome.ChromeDriver\\nCapabilities {acceptInsecureCerts: false, browserName: chrome, browserVersion: 87.0.4280.141, chrome: {chromedriverVersion: 86.0.4240.22 (398b0743353ff..., userDataDir: C:\\\\Users\\\\Eugene\\\\AppData\\\\Loc...}, goog:chromeOptions: {debuggerAddress: localhost:64508}, javascriptEnabled: true, networkConnectionEnabled: false, pageLoadStrategy: normal, platform: WINDOWS, platformName: WINDOWS, proxy: Proxy(system), setWindowRect: true, strictFileInteractability: false, timeouts: {implicit: 0, pageLoad: 300000, script: 30000}, unhandledPromptBehavior: dismiss and notify, webauthn:virtualAuthenticators: true}\\nSession ID: 9296b7e2420318eca243c02fc8a8286e\\n in inline evaluation of: ``import org.apache.commons.io.FileUtils; import org.openqa.selenium.*; import org . . . '' at line number 18", 1, 16.666666666666668, 5.0], "isController": false}, {"data": ["500/Sourced file: inline evaluation of: ``import org.apache.commons.io.FileUtils; import org.openqa.selenium.*; import org . . . '' : Method Invocation click : at Line: 18 : in file: inline evaluation of: ``import org.apache.commons.io.FileUtils; import org.openqa.selenium.*; import org . . . '' : .click ( ) \\n\\nTarget exception: org.openqa.selenium.ElementNotInteractableException: element not interactable\\n  (Session info: chrome=87.0.4280.141)\\nBuild info: version: '3.14.0', revision: 'aacccce0', time: '2018-08-02T20:19:58.91Z'\\nSystem info: host: 'DESKTOP-7B2EO79', ip: '192.168.100.7', os.name: 'Windows 10', os.arch: 'amd64', os.version: '10.0', java.version: '1.8.0_241'\\nDriver info: org.openqa.selenium.chrome.ChromeDriver\\nCapabilities {acceptInsecureCerts: false, browserName: chrome, browserVersion: 87.0.4280.141, chrome: {chromedriverVersion: 86.0.4240.22 (398b0743353ff..., userDataDir: C:\\\\Users\\\\Eugene\\\\AppData\\\\Loc...}, goog:chromeOptions: {debuggerAddress: localhost:65053}, javascriptEnabled: true, networkConnectionEnabled: false, pageLoadStrategy: normal, platform: WINDOWS, platformName: WINDOWS, proxy: Proxy(system), setWindowRect: true, strictFileInteractability: false, timeouts: {implicit: 0, pageLoad: 300000, script: 30000}, unhandledPromptBehavior: dismiss and notify, webauthn:virtualAuthenticators: true}\\nSession ID: d5ba7e5425674e6cede3b9e9c8b7d844\\n in inline evaluation of: ``import org.apache.commons.io.FileUtils; import org.openqa.selenium.*; import org . . . '' at line number 18", 1, 16.666666666666668, 5.0], "isController": false}, {"data": ["500/Sourced file: inline evaluation of: ``import org.apache.commons.io.FileUtils; import org.openqa.selenium.*; import org . . . '' : Method Invocation click : at Line: 18 : in file: inline evaluation of: ``import org.apache.commons.io.FileUtils; import org.openqa.selenium.*; import org . . . '' : .click ( ) \\n\\nTarget exception: org.openqa.selenium.ElementNotInteractableException: element not interactable\\n  (Session info: chrome=87.0.4280.141)\\nBuild info: version: '3.14.0', revision: 'aacccce0', time: '2018-08-02T20:19:58.91Z'\\nSystem info: host: 'DESKTOP-7B2EO79', ip: '192.168.100.7', os.name: 'Windows 10', os.arch: 'amd64', os.version: '10.0', java.version: '1.8.0_241'\\nDriver info: org.openqa.selenium.chrome.ChromeDriver\\nCapabilities {acceptInsecureCerts: false, browserName: chrome, browserVersion: 87.0.4280.141, chrome: {chromedriverVersion: 86.0.4240.22 (398b0743353ff..., userDataDir: C:\\\\Users\\\\Eugene\\\\AppData\\\\Loc...}, goog:chromeOptions: {debuggerAddress: localhost:64322}, javascriptEnabled: true, networkConnectionEnabled: false, pageLoadStrategy: normal, platform: WINDOWS, platformName: WINDOWS, proxy: Proxy(system), setWindowRect: true, strictFileInteractability: false, timeouts: {implicit: 0, pageLoad: 300000, script: 30000}, unhandledPromptBehavior: dismiss and notify, webauthn:virtualAuthenticators: true}\\nSession ID: c73ea29a81ca47d72d3d946564b3f2e4\\n in inline evaluation of: ``import org.apache.commons.io.FileUtils; import org.openqa.selenium.*; import org . . . '' at line number 18", 1, 16.666666666666668, 5.0], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 20, 6, "500/Sourced file: inline evaluation of: ``import org.apache.commons.io.FileUtils; import org.openqa.selenium.*; import org . . . '' : Method Invocation click : at Line: 18 : in file: inline evaluation of: ``import org.apache.commons.io.FileUtils; import org.openqa.selenium.*; import org . . . '' : .click ( ) \\n\\nTarget exception: org.openqa.selenium.ElementNotInteractableException: element not interactable\\n  (Session info: chrome=87.0.4280.141)\\nBuild info: version: '3.14.0', revision: 'aacccce0', time: '2018-08-02T20:19:58.91Z'\\nSystem info: host: 'DESKTOP-7B2EO79', ip: '192.168.100.7', os.name: 'Windows 10', os.arch: 'amd64', os.version: '10.0', java.version: '1.8.0_241'\\nDriver info: org.openqa.selenium.chrome.ChromeDriver\\nCapabilities {acceptInsecureCerts: false, browserName: chrome, browserVersion: 87.0.4280.141, chrome: {chromedriverVersion: 86.0.4240.22 (398b0743353ff..., userDataDir: C:\\\\Users\\\\Eugene\\\\AppData\\\\Loc...}, goog:chromeOptions: {debuggerAddress: localhost:64673}, javascriptEnabled: true, networkConnectionEnabled: false, pageLoadStrategy: normal, platform: WINDOWS, platformName: WINDOWS, proxy: Proxy(system), setWindowRect: true, strictFileInteractability: false, timeouts: {implicit: 0, pageLoad: 300000, script: 30000}, unhandledPromptBehavior: dismiss and notify, webauthn:virtualAuthenticators: true}\\nSession ID: 8e581ccd30adbb321a6bca81c8e77d8d\\n in inline evaluation of: ``import org.apache.commons.io.FileUtils; import org.openqa.selenium.*; import org . . . '' at line number 18", 1, "500/javascript error: Cannot read property 'outerHTML' of null\\n  (Session info: chrome=87.0.4280.141)\\nBuild info: version: '3.14.0', revision: 'aacccce0', time: '2018-08-02T20:19:58.91Z'\\nSystem info: host: 'DESKTOP-7B2EO79', ip: '192.168.100.7', os.name: 'Windows 10', os.arch: 'amd64', os.version: '10.0', java.version: '1.8.0_241'\\nDriver info: org.openqa.selenium.chrome.ChromeDriver\\nCapabilities {acceptInsecureCerts: false, browserName: chrome, browserVersion: 87.0.4280.141, chrome: {chromedriverVersion: 86.0.4240.22 (398b0743353ff..., userDataDir: C:\\\\Users\\\\Eugene\\\\AppData\\\\Loc...}, goog:chromeOptions: {debuggerAddress: localhost:64858}, javascriptEnabled: true, networkConnectionEnabled: false, pageLoadStrategy: normal, platform: WINDOWS, platformName: WINDOWS, proxy: Proxy(system), setWindowRect: true, strictFileInteractability: false, timeouts: {implicit: 0, pageLoad: 300000, script: 30000}, unhandledPromptBehavior: dismiss and notify, webauthn:virtualAuthenticators: true}\\nSession ID: e41cae6c196a4625eb4692ac287d5a1d", 1, "500/Sourced file: inline evaluation of: ``import org.apache.commons.io.FileUtils; import org.openqa.selenium.*; import org . . . '' : Method Invocation click : at Line: 18 : in file: inline evaluation of: ``import org.apache.commons.io.FileUtils; import org.openqa.selenium.*; import org . . . '' : .click ( ) \\n\\nTarget exception: org.openqa.selenium.ElementNotInteractableException: element not interactable\\n  (Session info: chrome=87.0.4280.141)\\nBuild info: version: '3.14.0', revision: 'aacccce0', time: '2018-08-02T20:19:58.91Z'\\nSystem info: host: 'DESKTOP-7B2EO79', ip: '192.168.100.7', os.name: 'Windows 10', os.arch: 'amd64', os.version: '10.0', java.version: '1.8.0_241'\\nDriver info: org.openqa.selenium.chrome.ChromeDriver\\nCapabilities {acceptInsecureCerts: false, browserName: chrome, browserVersion: 87.0.4280.141, chrome: {chromedriverVersion: 86.0.4240.22 (398b0743353ff..., userDataDir: C:\\\\Users\\\\Eugene\\\\AppData\\\\Loc...}, goog:chromeOptions: {debuggerAddress: localhost:64224}, javascriptEnabled: true, networkConnectionEnabled: false, pageLoadStrategy: normal, platform: WINDOWS, platformName: WINDOWS, proxy: Proxy(system), setWindowRect: true, strictFileInteractability: false, timeouts: {implicit: 0, pageLoad: 300000, script: 30000}, unhandledPromptBehavior: dismiss and notify, webauthn:virtualAuthenticators: true}\\nSession ID: 59f734cc1e9a1b3a43999af5271a1c8b\\n in inline evaluation of: ``import org.apache.commons.io.FileUtils; import org.openqa.selenium.*; import org . . . '' at line number 18", 1, "500/Sourced file: inline evaluation of: ``import org.apache.commons.io.FileUtils; import org.openqa.selenium.*; import org . . . '' : Method Invocation click : at Line: 18 : in file: inline evaluation of: ``import org.apache.commons.io.FileUtils; import org.openqa.selenium.*; import org . . . '' : .click ( ) \\n\\nTarget exception: org.openqa.selenium.ElementNotInteractableException: element not interactable\\n  (Session info: chrome=87.0.4280.141)\\nBuild info: version: '3.14.0', revision: 'aacccce0', time: '2018-08-02T20:19:58.91Z'\\nSystem info: host: 'DESKTOP-7B2EO79', ip: '192.168.100.7', os.name: 'Windows 10', os.arch: 'amd64', os.version: '10.0', java.version: '1.8.0_241'\\nDriver info: org.openqa.selenium.chrome.ChromeDriver\\nCapabilities {acceptInsecureCerts: false, browserName: chrome, browserVersion: 87.0.4280.141, chrome: {chromedriverVersion: 86.0.4240.22 (398b0743353ff..., userDataDir: C:\\\\Users\\\\Eugene\\\\AppData\\\\Loc...}, goog:chromeOptions: {debuggerAddress: localhost:64508}, javascriptEnabled: true, networkConnectionEnabled: false, pageLoadStrategy: normal, platform: WINDOWS, platformName: WINDOWS, proxy: Proxy(system), setWindowRect: true, strictFileInteractability: false, timeouts: {implicit: 0, pageLoad: 300000, script: 30000}, unhandledPromptBehavior: dismiss and notify, webauthn:virtualAuthenticators: true}\\nSession ID: 9296b7e2420318eca243c02fc8a8286e\\n in inline evaluation of: ``import org.apache.commons.io.FileUtils; import org.openqa.selenium.*; import org . . . '' at line number 18", 1, "500/Sourced file: inline evaluation of: ``import org.apache.commons.io.FileUtils; import org.openqa.selenium.*; import org . . . '' : Method Invocation click : at Line: 18 : in file: inline evaluation of: ``import org.apache.commons.io.FileUtils; import org.openqa.selenium.*; import org . . . '' : .click ( ) \\n\\nTarget exception: org.openqa.selenium.ElementNotInteractableException: element not interactable\\n  (Session info: chrome=87.0.4280.141)\\nBuild info: version: '3.14.0', revision: 'aacccce0', time: '2018-08-02T20:19:58.91Z'\\nSystem info: host: 'DESKTOP-7B2EO79', ip: '192.168.100.7', os.name: 'Windows 10', os.arch: 'amd64', os.version: '10.0', java.version: '1.8.0_241'\\nDriver info: org.openqa.selenium.chrome.ChromeDriver\\nCapabilities {acceptInsecureCerts: false, browserName: chrome, browserVersion: 87.0.4280.141, chrome: {chromedriverVersion: 86.0.4240.22 (398b0743353ff..., userDataDir: C:\\\\Users\\\\Eugene\\\\AppData\\\\Loc...}, goog:chromeOptions: {debuggerAddress: localhost:65053}, javascriptEnabled: true, networkConnectionEnabled: false, pageLoadStrategy: normal, platform: WINDOWS, platformName: WINDOWS, proxy: Proxy(system), setWindowRect: true, strictFileInteractability: false, timeouts: {implicit: 0, pageLoad: 300000, script: 30000}, unhandledPromptBehavior: dismiss and notify, webauthn:virtualAuthenticators: true}\\nSession ID: d5ba7e5425674e6cede3b9e9c8b7d844\\n in inline evaluation of: ``import org.apache.commons.io.FileUtils; import org.openqa.selenium.*; import org . . . '' at line number 18", 1], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["jp@gc - WebDriver Sampler", 20, 6, "500/Sourced file: inline evaluation of: ``import org.apache.commons.io.FileUtils; import org.openqa.selenium.*; import org . . . '' : Method Invocation click : at Line: 18 : in file: inline evaluation of: ``import org.apache.commons.io.FileUtils; import org.openqa.selenium.*; import org . . . '' : .click ( ) \\n\\nTarget exception: org.openqa.selenium.ElementNotInteractableException: element not interactable\\n  (Session info: chrome=87.0.4280.141)\\nBuild info: version: '3.14.0', revision: 'aacccce0', time: '2018-08-02T20:19:58.91Z'\\nSystem info: host: 'DESKTOP-7B2EO79', ip: '192.168.100.7', os.name: 'Windows 10', os.arch: 'amd64', os.version: '10.0', java.version: '1.8.0_241'\\nDriver info: org.openqa.selenium.chrome.ChromeDriver\\nCapabilities {acceptInsecureCerts: false, browserName: chrome, browserVersion: 87.0.4280.141, chrome: {chromedriverVersion: 86.0.4240.22 (398b0743353ff..., userDataDir: C:\\\\Users\\\\Eugene\\\\AppData\\\\Loc...}, goog:chromeOptions: {debuggerAddress: localhost:64673}, javascriptEnabled: true, networkConnectionEnabled: false, pageLoadStrategy: normal, platform: WINDOWS, platformName: WINDOWS, proxy: Proxy(system), setWindowRect: true, strictFileInteractability: false, timeouts: {implicit: 0, pageLoad: 300000, script: 30000}, unhandledPromptBehavior: dismiss and notify, webauthn:virtualAuthenticators: true}\\nSession ID: 8e581ccd30adbb321a6bca81c8e77d8d\\n in inline evaluation of: ``import org.apache.commons.io.FileUtils; import org.openqa.selenium.*; import org . . . '' at line number 18", 1, "500/javascript error: Cannot read property 'outerHTML' of null\\n  (Session info: chrome=87.0.4280.141)\\nBuild info: version: '3.14.0', revision: 'aacccce0', time: '2018-08-02T20:19:58.91Z'\\nSystem info: host: 'DESKTOP-7B2EO79', ip: '192.168.100.7', os.name: 'Windows 10', os.arch: 'amd64', os.version: '10.0', java.version: '1.8.0_241'\\nDriver info: org.openqa.selenium.chrome.ChromeDriver\\nCapabilities {acceptInsecureCerts: false, browserName: chrome, browserVersion: 87.0.4280.141, chrome: {chromedriverVersion: 86.0.4240.22 (398b0743353ff..., userDataDir: C:\\\\Users\\\\Eugene\\\\AppData\\\\Loc...}, goog:chromeOptions: {debuggerAddress: localhost:64858}, javascriptEnabled: true, networkConnectionEnabled: false, pageLoadStrategy: normal, platform: WINDOWS, platformName: WINDOWS, proxy: Proxy(system), setWindowRect: true, strictFileInteractability: false, timeouts: {implicit: 0, pageLoad: 300000, script: 30000}, unhandledPromptBehavior: dismiss and notify, webauthn:virtualAuthenticators: true}\\nSession ID: e41cae6c196a4625eb4692ac287d5a1d", 1, "500/Sourced file: inline evaluation of: ``import org.apache.commons.io.FileUtils; import org.openqa.selenium.*; import org . . . '' : Method Invocation click : at Line: 18 : in file: inline evaluation of: ``import org.apache.commons.io.FileUtils; import org.openqa.selenium.*; import org . . . '' : .click ( ) \\n\\nTarget exception: org.openqa.selenium.ElementNotInteractableException: element not interactable\\n  (Session info: chrome=87.0.4280.141)\\nBuild info: version: '3.14.0', revision: 'aacccce0', time: '2018-08-02T20:19:58.91Z'\\nSystem info: host: 'DESKTOP-7B2EO79', ip: '192.168.100.7', os.name: 'Windows 10', os.arch: 'amd64', os.version: '10.0', java.version: '1.8.0_241'\\nDriver info: org.openqa.selenium.chrome.ChromeDriver\\nCapabilities {acceptInsecureCerts: false, browserName: chrome, browserVersion: 87.0.4280.141, chrome: {chromedriverVersion: 86.0.4240.22 (398b0743353ff..., userDataDir: C:\\\\Users\\\\Eugene\\\\AppData\\\\Loc...}, goog:chromeOptions: {debuggerAddress: localhost:64224}, javascriptEnabled: true, networkConnectionEnabled: false, pageLoadStrategy: normal, platform: WINDOWS, platformName: WINDOWS, proxy: Proxy(system), setWindowRect: true, strictFileInteractability: false, timeouts: {implicit: 0, pageLoad: 300000, script: 30000}, unhandledPromptBehavior: dismiss and notify, webauthn:virtualAuthenticators: true}\\nSession ID: 59f734cc1e9a1b3a43999af5271a1c8b\\n in inline evaluation of: ``import org.apache.commons.io.FileUtils; import org.openqa.selenium.*; import org . . . '' at line number 18", 1, "500/Sourced file: inline evaluation of: ``import org.apache.commons.io.FileUtils; import org.openqa.selenium.*; import org . . . '' : Method Invocation click : at Line: 18 : in file: inline evaluation of: ``import org.apache.commons.io.FileUtils; import org.openqa.selenium.*; import org . . . '' : .click ( ) \\n\\nTarget exception: org.openqa.selenium.ElementNotInteractableException: element not interactable\\n  (Session info: chrome=87.0.4280.141)\\nBuild info: version: '3.14.0', revision: 'aacccce0', time: '2018-08-02T20:19:58.91Z'\\nSystem info: host: 'DESKTOP-7B2EO79', ip: '192.168.100.7', os.name: 'Windows 10', os.arch: 'amd64', os.version: '10.0', java.version: '1.8.0_241'\\nDriver info: org.openqa.selenium.chrome.ChromeDriver\\nCapabilities {acceptInsecureCerts: false, browserName: chrome, browserVersion: 87.0.4280.141, chrome: {chromedriverVersion: 86.0.4240.22 (398b0743353ff..., userDataDir: C:\\\\Users\\\\Eugene\\\\AppData\\\\Loc...}, goog:chromeOptions: {debuggerAddress: localhost:64508}, javascriptEnabled: true, networkConnectionEnabled: false, pageLoadStrategy: normal, platform: WINDOWS, platformName: WINDOWS, proxy: Proxy(system), setWindowRect: true, strictFileInteractability: false, timeouts: {implicit: 0, pageLoad: 300000, script: 30000}, unhandledPromptBehavior: dismiss and notify, webauthn:virtualAuthenticators: true}\\nSession ID: 9296b7e2420318eca243c02fc8a8286e\\n in inline evaluation of: ``import org.apache.commons.io.FileUtils; import org.openqa.selenium.*; import org . . . '' at line number 18", 1, "500/Sourced file: inline evaluation of: ``import org.apache.commons.io.FileUtils; import org.openqa.selenium.*; import org . . . '' : Method Invocation click : at Line: 18 : in file: inline evaluation of: ``import org.apache.commons.io.FileUtils; import org.openqa.selenium.*; import org . . . '' : .click ( ) \\n\\nTarget exception: org.openqa.selenium.ElementNotInteractableException: element not interactable\\n  (Session info: chrome=87.0.4280.141)\\nBuild info: version: '3.14.0', revision: 'aacccce0', time: '2018-08-02T20:19:58.91Z'\\nSystem info: host: 'DESKTOP-7B2EO79', ip: '192.168.100.7', os.name: 'Windows 10', os.arch: 'amd64', os.version: '10.0', java.version: '1.8.0_241'\\nDriver info: org.openqa.selenium.chrome.ChromeDriver\\nCapabilities {acceptInsecureCerts: false, browserName: chrome, browserVersion: 87.0.4280.141, chrome: {chromedriverVersion: 86.0.4240.22 (398b0743353ff..., userDataDir: C:\\\\Users\\\\Eugene\\\\AppData\\\\Loc...}, goog:chromeOptions: {debuggerAddress: localhost:65053}, javascriptEnabled: true, networkConnectionEnabled: false, pageLoadStrategy: normal, platform: WINDOWS, platformName: WINDOWS, proxy: Proxy(system), setWindowRect: true, strictFileInteractability: false, timeouts: {implicit: 0, pageLoad: 300000, script: 30000}, unhandledPromptBehavior: dismiss and notify, webauthn:virtualAuthenticators: true}\\nSession ID: d5ba7e5425674e6cede3b9e9c8b7d844\\n in inline evaluation of: ``import org.apache.commons.io.FileUtils; import org.openqa.selenium.*; import org . . . '' at line number 18", 1], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
