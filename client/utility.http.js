/** @namespace */
var utility = utility || {};
(function()
{
	"use strict";

	/**
     * Utilitaire HTTP (utility).
     * @returns {utility.Http}
	 */
	utility.http = function()
	{
		return new utility.Http();
	};

	/**
     * Retourne un objet permettant de gérer l'état des executions asynchrones en parallele, c'est compteur déclenchant la fonction de callback uniquement lorsque tous les appels ont retourné une réponse.
     * @param   {number} qty - nombre d'executions
     * @param   {callbackFn} callbackFn
     * @returns {object}
	 *
	 * @example
	 * // dans l'exemple suivant le "finalCallback" ne sera executé que lorsque
	 * // les deux appels HTTP auront retourné une réponse
	 * var finalCallback = utility.http.getParallelCallback(2, function()
	 * {
	 * 	console.log("tout est fini");
	 * });
	 *
	 * utility.http().url("http://www.example.com/1").get(function(response)
	 * {
	 * 	finalCallback.step();
	 * });
	 *
	 * utility.http().url("http://www.example.com/2").get(function(response)
	 * {
	 * 	finalCallback.step();
	 * });
	 */
	utility.http.getParallelCallback = function(qty, callbackFn)
	{
		return {
			toLoad: qty,
			loaded: 0,
			step: function()
			{
				this.loaded += 1;
				if(this.loaded === this.toLoad && typeof callbackFn === "function") callbackFn();
			}
		};
	};

	// ---

	/**
     * Utilitaire HTTP.
     * @constructor
	 *
	 * @example
	 * utility.http().url("http://www.example.com/list").get(function(response)
	 * {
	 * 	console.log("response:", response);
	 * });
	 */
	utility.Http = function()
	{
		this._options = {};
		this._options.url = null;      // string
		this._options.query = "";      // string | object
		this._options.data = null;     // FormData | object
		this._options.files = null;    // FileList | array
		this._options.headers = null;  // object
		this._options.type = "json";   // text | json
	};

	// ---

	/**
     * Définit ou retourne un ensemble d'options.
     * @param   {Object} [arguments]
     * @returns {Object|this}
	 */
	utility.Http.prototype.options = function()
	{
		// () getter
		if(arguments.length === 0)
		{
			return this._options;
		}

		// (options) setter
		if(arguments.length === 1)
		{
			var options = arguments[0];
			if(typeof options !== "object") return this;

			for(var key in options)
			{
				if(!options.hasOwnProperty(key)) continue;
				if(typeof this[key] !== "function") continue;
				this[key](options[key]);
			}

			return this;
		}
	};

	/**
     * Définit ou retourne l'url.
     * @param   {string} [arguments]
     * @returns {string|this}
	 */
	utility.Http.prototype.url = function()
	{
		// () getter
		if(arguments.length === 0)
		{
			return this._options.url;
		}

		// (value) setter
		if(arguments.length === 1)
		{
			this._options.url = arguments[0];
			return this;
		}
	};

	/**
     * Définit ou retourne les paramètres de l'url.
     * @param   {string|Object} [arguments]
     * @returns {string|Object|this}
	 */
	utility.Http.prototype.query = function()
	{
		// () getter
		if(arguments.length === 0)
		{
			return this._options.query;
		}

		// (value) setter
		if(arguments.length === 1)
		{
			this._options.query = arguments[0];
			return this;
		}
	};

	/**
     * Définit ou retourne les données à poster.
     * @param   {Object|FormData} [arguments]
     * @returns {Object|FormData|this}
	 */
	utility.Http.prototype.data = function()
	{
		// () getter
		if(arguments.length === 0)
		{
			return this._options.data;
		}

		// (value) setter
		if(arguments.length === 1)
		{
			this._options.data = arguments[0];
			return this;
		}
	};

	/**
     * Définit ou retourne les fichiers à poster.
     * @param   {Object|FileList} [arguments]
     * @returns {Object|FileList|this}
	 */
	utility.Http.prototype.files = function()
	{
		// () getter
		if(arguments.length === 0)
		{
			return this._options.files;
		}

		// (value) setter
		if(arguments.length === 1)
		{
			this._options.files = arguments[0];
			return this;
		}
	};

	/**
     * Définit ou retourne les entetes HTTP.
     * @param   {Object} [arguments]
     * @returns {Object|this}
	 */
	utility.Http.prototype.headers = function()
	{
		// () getter
		if(arguments.length === 0)
		{
			return this._options.headers;
		}

		// (value) setter
		if(arguments.length === 1)
		{
			this._options.headers = arguments[0];
			return this;
		}
	};

	/**
     * Définit ou retourne le type de réponse.
     * @param   {string} [arguments=json] - type du format de réponse (text | json)
     * @returns {string|this}
	 */
	utility.Http.prototype.type = function()
	{
		// () getter
		if(arguments.length === 0)
		{
			return this._options.type;
		}

		// (value) setter
		if(arguments.length === 1)
		{
			this._options.type = arguments[0];
			return this;
		}
	};

	// ---

	/**
     * Envoi d'une requete.
	 * @param  {string} method - méthode d'envoi (get | post | jsonp | iframe)
	 * @param  {Function} [cbkOnSuccess] - fonction callback après réussite de l'appel
	 * @param  {Function} [cbkOnError] - fonction callback après echec de l'appel
	 * @param  {any} [cbkParam] - paramètre à transmettre au callback
	 */
	utility.Http.prototype.send = function(method, cbkOnSuccess, cbkOnError, cbkParam)
	{
		if(typeof method === "undefined" || method === null || method.length === 0) throw "le paramètre 'method' est manquant";

		switch(method.toLowerCase())
		{
			case "get": this.get(cbkOnSuccess, cbkOnError, cbkParam); break;
			case "post": this.post(cbkOnSuccess, cbkOnError, cbkParam); break;
			case "jsonp": this.jsonp(cbkOnSuccess, cbkOnError, cbkParam); break;
			case "iframe": this.getOnIframe(); break;
		}
	};

	/**
     * Retourne le résultat d'une requete GET.
	 * @param  {Function} [cbkOnSuccess] - fonction callback après réussite de l'appel, forme: fn(response, cbkParam)
	 * @param  {Function} [cbkOnError] - fonction callback après echec de l'appel, forme: fn(response, cbkParam, url)
	 * @param  {any} [cbkParam] - paramètre à transmettre au callback
	 */
	utility.Http.prototype.get = function(cbkOnSuccess, cbkOnError, cbkParam)
	{
		// no url
		if(typeof this._options.url === "undefined" || this._options.url === null || this._options.url.length === 0) throw "le paramètre 'url' est manquant";

		// default
		if(typeof cbkOnSuccess === "function" && typeof cbkOnError !== "function") cbkOnError = cbkOnSuccess;

		// url + query
		var query = getQuery(this._options.query);
		var urlWithQuery = addQuery(this._options.url, query);

		// this
		var thisHttp = this;

		// request
		var req = new XMLHttpRequest();
		req.open("GET", urlWithQuery, true);
		req.withCredentials = true;
		//req.responseType = this._options.type; // not IE
		req.onreadystatechange = function (e)
		{
			if (req.readyState !== 4) return;
			if (req.status !== 200)
			{
				// error message
				console.error("[utility.http] une erreur est survenue\n" +
				"status:" + req.status + "\n" +
				"url:" + thisHttp._options.url);

				// error callback
				if (typeof cbkOnError === "function") cbkOnError(null, cbkParam, thisHttp._options.url);
				return;
			}

			if (typeof cbkOnSuccess === "function")
			{
				var response = req.response;
				if(thisHttp._options.type === "json")
				{
					try
					{
						response = JSON.parse(response);
					}
					catch (e) 
					{
						console.log("response: ", response);
						throw e;
					}
				}
				cbkOnSuccess(response, cbkParam);
			}
		};

		// custom headers
		if(typeof this._options.headers === "object")
		{
			for(var key in this._options.headers)
			{
				if(!this._options.headers.hasOwnProperty(key)) continue;
				req.setRequestHeader(key, this._options.headers[key]);
			}
		}

		// send
		req.send(null);

		return this;
	};

	/**
     * Retourne le résultat d'une requete POST.
	 * @param  {Function} [cbkOnSuccess] - fonction callback après réussite de l'appel
	 * @param  {Function} [cbkOnError] - fonction callback après echec de l'appel, forme: fn(response, cbkParam)
	 * @param  {any} [cbkParam] - paramètre à transmettre au callback
	 */
	utility.Http.prototype.post = function(cbkOnSuccess, cbkOnError, cbkParam)
	{
		// no url
		if(typeof this._options.url === "undefined" || this._options.url === null || this._options.url.length === 0) throw "le paramètre 'url' est manquant";

		// default
		if(typeof cbkOnSuccess === "function" && typeof cbkOnError !== "function") cbkOnError = cbkOnSuccess;

		// url + query
		var query = getQuery(this._options.query);
		var urlWithQuery = addQuery(this._options.url, query);

		// this
		var thisHttp = this;

		// request
		var req = new XMLHttpRequest();
		req.open("POST", urlWithQuery, true);
		req.withCredentials = true;
		//req.responseType = this._options.type; // not IE
		req.onreadystatechange = function (e)
		{
			if (req.readyState !== 4) return;
			if (req.status !== 200)
			{
				// error message
				console.error("[utility.http] une erreur est survenue\n" +
				"status:" + req.status + "\n" +
				"url:" + thisHttp._options.url);

				// error callback
				if (typeof cbkOnError === "function") cbkOnError(null, cbkParam, thisHttp._options.url);
				return;
			}

			if (typeof cbkOnSuccess === "function")
			{
				var response = req.response;
				if(thisHttp._options.type === "json")
				{
					try
					{
						response = JSON.parse(response);
					}
					catch (e) 
					{
						console.log("response: ", response);
						throw e;
					}
				}
				cbkOnSuccess(response, cbkParam);
			}
		};

		// custom headers
		if(typeof this._options.headers === "object")
		{
			for(var key in this._options.headers)
			{
				if(!this._options.headers.hasOwnProperty(key)) continue;
				req.setRequestHeader(key, this._options.headers[key]);
			}
		}

		// post data
		if(!(this._options.data instanceof FormData) && typeof this._options.data === "object")
		{
			var data = new FormData();
			for(var key in this._options.data)
			{
				if(!this._options.data.hasOwnProperty(key)) continue;
				data.append(key, this._options.data[key]);
			}
			 this._options.data = data;
		}

		// post files
		var filesType = Object.prototype.toString.apply(this._options.files);
		if(filesType === "[object FileList]" || filesType === "[object Array]")
		{
			if(this._options.data === null) this._options.data = new FormData();

			for(var y=0; y < this._options.files.length; y++)
			{
				data.append(this._options.files[y].name, this._options.files[y]);
			}
		}

		// send
		req.send(this._options.data);

		return this;
	};

	/**
     * Retourne le résultat d'une requete JSONP.
	 * @param  {Function} [cbkOnSuccess] - fonction callback après réussite de l'appel, forme: fn(response, cbkParam)
	 * @param  {Function} [cbkOnError] - fonction callback après echec de l'appel, forme: fn(response, cbkParam, url)
	 * @param  {any} [cbkParam] - paramètre à transmettre au callback
	 */
	utility.Http.prototype.jsonp = function(cbkOnSuccess, cbkOnError, cbkParam)
	{
		// no url
		if(typeof this._options.url === "undefined" || this._options.url === null || this._options.url.length === 0) throw "le paramètre 'url' est manquant";

		// default
		if(typeof cbkOnSuccess === "function" && typeof cbkOnError !== "function") cbkOnError = cbkOnSuccess;

		// body
		var body = document.getElementsByTagName("body")[0];
		if(typeof body === "undefined") throw "le noeud 'body' est manquant.";

		// url + query
		var query = getQuery(this._options.query);
		var urlWithQuery = addQuery(this._options.url, query);

		// this
		var thisHttp = this;

		// callback
		var callbackId = "cbk_" + getHashUnsigned(urlWithQuery);
		window[callbackId] = function(response)
		{
			if(typeof cbkOnSuccess === "function") cbkOnSuccess(response, cbkParam);
			var s = document.getElementById("s" + callbackId);
			s.parentNode.removeChild(s);
		};

		// add callback param
		urlWithQuery = addQuery(urlWithQuery, "callback=" + callbackId);

		// script
		var scr = document.createElement("SCRIPT");
		scr.id = "s" + callbackId;
		scr.src = urlWithQuery;
		if(typeof cbkOnError === "function") scr.onerror = function(){ cbkOnError(scr, cbkParam, thisHttp._options.url); };
		body.appendChild(scr);
	};

	/**
     * Envoi d'une requete dans une iframe (pour déclencher le téléchargement d'un fichier par exemple).
	 * @param  {Function} [cbkOnSuccess] - fonction callback après chargement, forme: fn(iframeElement, cbkParam)
	 * @param  {Function} [cbkOnError] - fonction callback après echec du chargement, forme: fn(iframeElement, cbkParam, url)
	 * @param  {any} [cbkParam] - paramètre à transmettre au callback
	 */
	utility.Http.prototype.iframe = function(cbkOnSuccess, cbkOnError, cbkParam)
	{
		// no url
		if(typeof this._options.url === "undefined" || this._options.url === null || this._options.url.length === 0) throw "le paramètre 'url' est manquant";

		// default
		if(typeof cbkOnSuccess === "function" && typeof cbkOnError !== "function") cbkOnError = cbkOnSuccess;

		// body
		var body = document.getElementsByTagName("body")[0];
		if(typeof body === "undefined") throw "le noeud 'body' est manquant.";

		// url + query
		var query = getQuery(this._options.query);
		var urlWithQuery = addQuery(this._options.url, query);

		// this
		var thisHttp = this;

		// iframe
		var iframeId = new Date().getTime() + "";
		var iframe = document.createElement("IFRAME");
		iframe.style.width = 0;
		iframe.style.height = 0;
		iframe.style.border = 0;
		iframe.style.margin = 0;
		iframe.style.padding = 0;
		iframe.frameborder = 0;
		iframe.id = iframeId;
		iframe.name = iframeId;
		iframe.src = urlWithQuery;
		if(typeof cbkOnSuccess === "function") iframe.onload = function(){ cbkOnSuccess(iframe, cbkParam); };
		if(typeof cbkOnError === "function") iframe.onerror = function(){ cbkOnError(iframe, cbkParam, thisHttp._options.url); };
		body.appendChild(iframe);
	};

    /**
     * Importe une ressource javascript avec utilisation de cache.
	 * @param  {string} [objName=null] - nom de l'objet servant à vérifier la fin du chargement du script
	 * @param  {Function} [cbkOnSuccess] - fonction callback après réussite du chargement, forme: fn(scriptElement, cbkParam)
	 * @param  {Function} [cbkOnError] - fonction callback après echec du chargement, forme: fn(scriptElement, cbkParam, url)
	 * @param  {any} [cbkParam] - paramètre à transmettre au callback
	 */
	utility.Http.prototype.importJs = function(objName, cbkOnSuccess, cbkOnError, cbkParam)
	{
		// no url
		if(typeof this._options.url === "undefined" || this._options.url === null || this._options.url.length === 0) throw "le paramètre 'url' est manquant";

		// default
		if(typeof cbkOnSuccess === "function" && typeof cbkOnError !== "function") cbkOnError = cbkOnSuccess;

		// check object already exists
		if(typeof objName === "string" && typeof getObjectFromName(objName) !== "undefined")
		{
			if(typeof cbkOnSuccess === "function") cbkOnSuccess(null, cbkParam);
			return;
		}
		
		// this
		var thisHttp = this;

		// check state
		if(!imports.check(this._options.url, 
			function(){ thisHttp.importJs(objName, cbkOnSuccess, cbkOnError, cbkParam); }, 
			function(){ if(typeof cbkOnSuccess === "function") cbkOnSuccess(null, cbkParam); }, 
			function(){ if(typeof cbkOnError === "function") cbkOnError(null, cbkParam); }))
		{
			return;
		}

		// body
		var body = document.getElementsByTagName("body")[0];
		if(typeof body === "undefined") throw "le noeud 'body' est manquant";

		// url + query
		var query = getQuery(this._options.query);
		var urlWithQuery = addQuery(this._options.url, query);

		// script
		var scr = document.createElement("SCRIPT");
		scr.src = urlWithQuery;
		if(typeof cbkOnSuccess === "function")
		{
			scr.onload = function(event, counter)
			{
				// OK
				if(typeof cbkOnSuccess === "function" && (typeof objName !== "string" || typeof getObjectFromName(objName) !== "undefined"))
				{
					imports.state[thisHttp._options.url] = 1;
					cbkOnSuccess(scr, cbkParam);
				}

				// error (waiting too long > ~5s)
				else if(typeof counter !== "undefined" && counter >= 50)
				{
					// error message
					console.error("[utility.http] une erreur est survenue\n" +
					"method: importJs\n" +
					"url:" + thisHttp._options.url);

					// error callback
					imports.state[thisHttp._options.url] = 2;
					if (typeof cbkOnError === "function") cbkOnError(scr, cbkParam, thisHttp._options.url);
				}

				// wait
				else
				{
					counter = typeof counter === "undefined" ? 1 : counter + 1;
					window.setTimeout(function(){ onLoad(null, counter); }, 100);
				}
			};
		}
		if(typeof cbkOnError === "function") scr.onerror = function(){ cbkOnError(scr, cbkParam, thisHttp._options.url); };
		body.appendChild(scr);
	};

	/**
     * Importe une ressource CSS avec utilisation de cache.
	 * @param  {Function} [cbkOnSuccess] - fonction callback après chargement, forme: fn(styleElement, cbkParam)
	 * @param  {Function} [cbkOnError] - fonction callback après echec du chargement, forme: fn(styleElement, cbkParam, url)
	 * @param  {any} [cbkParam] - paramètre à transmettre au callback
	 */
	utility.Http.prototype.importCss = function(cbkOnSuccess, cbkOnError, cbkParam)
	{
		// no url
		if(typeof this._options.url === "undefined" || this._options.url === null || this._options.url.length === 0) throw "le paramètre 'url' est manquant";

		// default
		if(typeof cbkOnSuccess === "function" && typeof cbkOnError !== "function") cbkOnError = cbkOnSuccess;
		
		// this
		var thisHttp = this;

		// check state
		if(!imports.check(this._options.url, 
			function(){ thisHttp.importJs(cbkOnSuccess, cbkOnError, cbkParam); }, 
			function(){ if(typeof cbkOnSuccess === "function") cbkOnSuccess(null, cbkParam); }, 
			function(){ if(typeof cbkOnError === "function") cbkOnError(null, cbkParam); }))
		{
			return;
		}

		// body
		var body = document.getElementsByTagName("body")[0];
		if(typeof body === "undefined") throw "le noeud 'body' est manquant.";

		// url + query
		var query = getQuery(this._options.query);
		var urlWithQuery = addQuery(this._options.url, query);

		// tag
		var link = document.createElement("LINK");
		link.rel = "stylesheet";
		link.href = urlWithQuery;
		link.onload = function()
		{ 
			imports.state[thisHttp._options.url] = 1;
			if(typeof cbkOnSuccess === "function") cbkOnSuccess(link, cbkParam); 
		};
		link.onerror = function()
		{ 
			imports.state[thisHttp._options.url] = 2;
			if(typeof cbkOnError === "function") cbkOnError(link, cbkParam, thisHttp._options.url); 
		};
		body.appendChild(link);
	};

	/**
     * Importe une resource HTML dans l'élement spécifié, remplace le contenu existant (les entetes CORS sont requises lors des appels cross-domain).
	 * @param  {HTMLElement|string} placeholder - element HTML dans lequel les éléments chargés seront ajoutés
	 * @param  {Function} [cbkOnSuccess] - fonction callback après chargement, forme: fn(HTMLCollection, cbkParam)
	 * @param  {Function} [cbkOnError] - fonction callback après echec du chargement, forme: fn(HTMLCollection, cbkParam, url)
	 * @param  {any} [cbkParam] - paramètre à transmettre au callback
	 */
	utility.Http.prototype.importHtml = function(placeholder, cbkOnSuccess, cbkOnError, cbkParam)
	{
		// TODO: pour pouvoir importer des scripts également il faut gérer le retour sous forme
		// de noeuds (getHTML) et recréer les balises script.

		// no placeholder
		if(typeof placeholder === "string") placeholder = document.querySelector(placeholder);
		if(typeof placeholder === "undefined" || placeholder === null) throw "le paramètre 'placeholder' est manquant";

		// no url
		if(typeof this._options.url === "undefined" || this._options.url === null || this._options.url.length === 0) throw "le paramètre 'url' est manquant";

		// default
		if(typeof cbkOnSuccess === "function" && typeof cbkOnError !== "function") cbkOnError = cbkOnSuccess;

		// get
		this.type("text").get(

			// success
			function(response, cbkParam)
			{
				placeholder.innerHTML = response;
				if(typeof cbkOnSuccess === "function") cbkOnSuccess(response, cbkParam);
			},

			// error
			function(response, cbkParam, url)
			{
				if(typeof cbkOnError === "function") cbkOnError(response, cbkParam, url);
			},

			// param
			cbkParam
		);
	};

	/**
     * Retourne une collection de noeuds HTML (les entetes CORS sont requises lors des appels cross-domain).
	 * @param  {Function} [cbkOnSuccess] - fonction callback après chargement, forme: fn(HTMLCollection, cbkParam)
	 * @param  {Function} [cbkOnError] - fonction callback après echec du chargement, forme: fn(HTMLCollection, cbkParam, url)
	 * @param  {any} [cbkParam] - paramètre à transmettre au callback
	 */
	utility.Http.prototype.getHtml = function(cbkOnSuccess, cbkOnError, cbkParam)
	{
		// no url
		if(typeof this._options.url === "undefined" || this._options.url === null || this._options.url.length === 0) throw "le paramètre 'url' est manquant";

		// default
		if(typeof cbkOnSuccess === "function" && typeof cbkOnError !== "function") cbkOnError = cbkOnSuccess;

		// get
		this.type("text").get(

			// success
			function(response, cbkParam)
			{
				if(typeof cbkOnSuccess === "function")
				{
					var tag = document.createElement("DIV");
					tag.innerHTML = response;
					cbkOnSuccess(tag.children, cbkParam);
				}
			},

			// error
			function(response, cbkParam, url)
			{
				if(typeof cbkOnError === "function") cbkOnError(response, cbkParam, url);
			},

			// param
			cbkParam
		);
	};

	// ---

	/**
     * Retourne des parametres sous forme de querystring.
     * @private
     * @memberof utility.http
	 * @param  {Object|string} params
     * @returns {string}
	 */
	var getQuery = function(params)
	{
		// type
		var paramsType = typeof params;

		// no value
		if(paramsType === "undefined" || params === null) return "";

		// string value (allready params)
		if(paramsType === "string") return params;

		// other type
		var query = [];
		for(var key in params)
		{
			if(!params.hasOwnProperty(key)) continue;
			query.push(getQueryValue(key, params[key]));
		}

		return query.join("&");
	};

	/**
     * Retourne une paire clé/valeur encodée pour un querystring.
     * @private
     * @memberof utility.http
	 * @param  {string} key
	 * @param  {string} value
     * @returns {string}
	 */
	var getQueryValue = function(key, value)
	{
		// type
		var valueType = Object.prototype.toString.call(value);

		// string value
		if(valueType === "[object String]" ||
		   valueType === "[object Number]" ||
		   valueType === "[object Boolean]") return key + "=" + encodeURIComponent(value);

		// date value
		if(valueType === "[object Date]") return key + "=" + encodeURIComponent(value.getTime());

		// array of primitives values
		if(valueType === "[object Array]" &&
		   (valueType.length === 0 ||
		   typeof value[0] !== "object")) return key + "=" + encodeURIComponent(value.join(','));

		// object/array value
		if(valueType === "[object Object]" || valueType === "[object Array]")
		{
			var queryPair = [];
			for(var valueKey in value)
			{
				if(!value.hasOwnProperty(valueKey)) continue;
				queryPair.push(getQueryValue(key + "." + valueKey, value[valueKey]));
			}

			return queryPair.join("&");
		}

		// no value
		return key + "=";
	};

	/**
     * Ajoute la query à l'url donnée.
     * @private
     * @memberof utility.http
	 * @param  {string} url
	 * @param  {string} query
     * @returns {string}
	 */
	var addQuery = function(url, query)
	{
		var resutl = url;
		if(query.length > 0)
		{
			if(url.indexOf('?') > -1)
			{
				resutl += "&" + query;
			}
			else
			{
				resutl += "?" + query;
			}
		}

		return resutl;
	};

	// ---

	/**
     * Retourne le hash non signé d'un string.
     * @private
     * @memberof utility.http
	 * @param  {string} str
     * @returns {string}
	 */
	var getHashUnsigned = function(str)
	{
		var hash = getHash(str);
		return (hash < 0 ? -hash : hash);
	};

    /**
     * Retourne le hash d'un string.
     * @private
     * @memberof utility.http
	 * @param  {string} str
     * @returns {string}
	 */
	var getHash = function(str)
	{
		var hash = 0, i, chr, len;
		if (str.length == 0) return hash;
		for (i = 0, len = str.length; i < len; i++)
		{
			chr   = str.charCodeAt(i);
			hash  = ((hash << 5) - hash) + chr;
			hash |= 0;
		}
		return hash;
	};

    /**
     * Retourne un objet depuis son nom (path).
     * @private
     * @memberof utility.http
	 * @param   {string} name
     * @returns {Object}
	 */
	var getObjectFromName = function(name)
	{
		var o = 0;
		var nameSegments = name.split(".");
		for(var i=0; i < nameSegments.length; i++)
		{
			var o = o === 0 ? window[nameSegments[i]] : o[nameSegments[i]];
			if(typeof o === "undefined") return undefined;
		}

		return o;
	};

	/**
     * Etat des imports
     * -1 = absent
	 * 0  = en cours 
	 * 1  = OK
	 * 2  = loaded with error
	 * 
     * @private
     * @memberof utility.http
	 */
	var imports = {};
	imports.state = {};

	// retourne vrai si l'execution doit continuer
	imports.check = function(item, fnWait, cbkOnSuccess, cbkOnError)
	{
		var state = typeof imports.state[item] !== "undefined" ? imports.state[item] : -1;
		
		switch(state)
		{
			case -1: imports.state[item]=0; return true;                                  // not exists
			case 0 : window.setTimeout(fnWait, 100); return false;                        // loading
			case 1 : if(typeof cbkOnSuccess === "function") cbkOnSuccess(); return false; // loaded OK
			case 2 : if(typeof cbkOnError === "function") cbkOnError(); return false;     // loaded on error
		}
	};

})();
