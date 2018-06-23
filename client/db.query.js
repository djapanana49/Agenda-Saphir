/*
Requete sur une source de données

Exemples

---------
SELECTION

select - retourne toutes les colonnes des lignes:
db.query().from(apiUrl).select().getRows(callbackFn); // toutes les colonnes par défaut
db.query().from(apiUrl).select("*").getRows(callbackFn);

select - retourne les colonnes id, col1 et col2:
db.query().from(apiUrl).select("id,col1,col2").getRows(callbackFn);
db.query().from(apiUrl).select(["id","col1","col2"]).getRows(callbackFn);

where - filtre sur les valeurs des colonnes col1 et id:
db.query().from(apiUrl).select().where("col1", "foo").where("id", "bar").getRows(callbackFn);

where - filtre à partir d'un objet (valeurs indéxées par l'id de colonne):
db.query().from(apiUrl).select().where(filterObject).getRows(callbackFn);

where - filtre à partir d'un objet et d'une paire clé/valeur:
db.query().from(apiUrl).select().where(filterObject).where("col1", "foo").getRows(callbackFn);

where - filtre avec opérateur sur le début de la valeur de la colonne col1 (voir également opérateurs):
db.query().from(apiUrl).select().where("col1", db.ops.starts, "foo").getRows(callbackFn);
db.query().from(apiUrl).select().where("col1", "str", "foo").getRows(callbackFn);

where - filtre à partir d'un objet "valeurs" et d'un objet "opérateurs":
db.query().from(apiUrl).select().where(filterObject, opsObject).getRows(callbackFn);

orderBy - tri sur la colonne id en ordre croissant:
db.query().from(apiUrl).select().orderBy("id").getRows(callbackFn); // croissant par defaut
db.query().from(apiUrl).select().orderBy("id", "asc").getRows(callbackFn);
db.query().from(apiUrl).select().orderBy("id", "a").getRows(callbackFn);

orderBy - tri sur la colonne id en ordre décroissant:
db.query().from(apiUrl).select().orderBy("id", "desc").getRows(callbackFn);
db.query().from(apiUrl).select().orderBy("id", "d").getRows(callbackFn);

range - retourne 15 lignes à partir de l'index 0:
db.query().from(apiUrl).select().getRows(callbackFn); // 0, 15 = valeurs par defaut
db.query().from(apiUrl).select().range(0, 15).getRows(callbackFn);

first - retourne la première ligne:
db.query().from(apiUrl).select().first().getRows(callbackFn);

getRowsCsv - retourne un fichier d'export au format CSV:
db.query().from(apiUrl).select().getRowsCsv(apiUrl);

getSchema - retourne le schema (+ les données de liste 'relatedData'):
db.query().from(apiUrl).select().getSchema(callbackFn);

getRowsAndSchema - retourne les lignes et le schema (+ les données de liste 'relatedData'):
db.query().from(apiUrl).select().getRowsAndSchema(callbackFn);

getStats - retourne les stats:
db.query().from(apiUrl).select().getStats(callbackFn);

-------------
INSERT/UPDATE

insert/update - insere ou modifie les colonnes id et col1:
db.query().from(apiUrl).insert().values("id", "valeur").values("col1", "autre valeur").insertRow(callbackFn);
db.query().from(apiUrl).update().values("id", "valeur").values("col1", "autre valeur").updateRow(callbackFn);

insert/update - insere ou modifie à partir d'un objet (valeurs indéxées par l'id de colonne):
db.query().from(apiUrl).insert().values(valuesObject).insertRow(callbackFn);
db.query().from(apiUrl).update().values(valuesObject).updateRow(callbackFn);

insert/update - insere ou modifie des valeurs et envoie un objet "fichiers" (fileList indéxées par l'id de colonne):
db.query().from(apiUrl).insert().values(valuesObject).files(filesObject).insertRow(callbackFn);
db.query().from(apiUrl).update().values(valuesObject).files(filesObject).updateRow(callbackFn);

insert/update - insere ou modifie des valeurs et envoie des fichiers pour la colonne col1:
db.query().from(apiUrl).insert().values(valuesObject).files("col1", fileList).insertRow(callbackFn);
db.query().from(apiUrl).update().values(valuesObject).files("col1", fileList).updateRow(callbackFn);

insertRow - retourne la ligne insérée (ou les erreurs de validation si il y en a):
db.query().from(apiUrl).insert().values(valuesObject).insertRow(callbackFn);

updateRow - retourne le nombre de lignes affectées par la modification (ou les erreurs de validation si il y en a):
db.query().from(apiUrl).update().values(valuesObject).updateRow(callbackFn);

--------------------
FILTRE ET OPERATEURS

equal - filtre les lignes dont la colonne col1 est égale à "foo":
db.query().from(apiUrl).select().where("col1", "foo").getRows(callbackFn); // opérateur equal par défaut
db.query().from(apiUrl).select().where("col1", db.ops.equal, "foo").getRows(callbackFn);
db.query().from(apiUrl).select().where("col1", "eqa", "foo").getRows(callbackFn);

contains - filtre les lignes dont la colonne col1 contient "foo" (colonnes de type chaine):
db.query().from(apiUrl).select().where("col1", db.ops.contains, "foo").getRows(callbackFn);
db.query().from(apiUrl).select().where("col1", "inv", "foo").getRows(callbackFn);

starts - filtre les lignes dont la colonne col1 commence par "foo" (colonnes de type chaine):
db.query().from(apiUrl).select().where("col1", db.ops.starts, "foo").getRows(callbackFn);
db.query().from(apiUrl).select().where("col1", "str", "foo").getRows(callbackFn);

ends - filtre les lignes dont la colonne col1 termine par "foo" (colonnes de type chaine):
db.query().from(apiUrl).select().where("col1", db.ops.ends, "foo").getRows(callbackFn);
db.query().from(apiUrl).select().where("col1", "end", "foo").getRows(callbackFn);

greater - filtre les lignes dont la colonne col1 est supérieure ou égale à 42 (colonnes de type nombre ou date):
db.query().from(apiUrl).select().where("col1", db.ops.greater, 42).getRows(callbackFn);
db.query().from(apiUrl).select().where("col1", "sup", 42).getRows(callbackFn);

less - filtre les lignes dont la colonne col1 est inférieure ou égale à 42 (colonnes de type nombre ou date):
db.query().from(apiUrl).select().where("col1", db.ops.less, 42).getRows(callbackFn);
db.query().from(apiUrl).select().where("col1", "inf", 42).getRows(callbackFn);

between - filtre les lignes dont la colonne col1 est comprise entre 42 et 50 (colonnes de type nombre ou date):
db.query().from(apiUrl).select().where("col1", db.ops.between, "42,50").getRows(callbackFn);
db.query().from(apiUrl).select().where("col1", "int", "42,50").getRows(callbackFn);

--
Opérateurs négatifs

Mêmes opérateurs que ci-dessus précédés de 'not', ci-dessous un exemple avec 'notEqual'.

notEqual - filtre les lignes dont la colonne col1 n'est pas égale à "foo":
db.query().from(apiUrl).select().where("col1", db.ops.notEqual, "foo").getRows(callbackFn); // db.ops.equal devient db.ops.notEqual
db.query().from(apiUrl).select().where("col1", "eqan", "foo").getRows(callbackFn); // eqa devient eqan

--
Valeurs multiples

filtre les lignes dont la colonne col1 est égale à "foo", "bar" ou "qux":
db.query().from(apiUrl).select().where("col1", ["foo","bar","qux"]).getRows(callbackFn);
db.query().from(apiUrl).select().where("col1", "foo,bar,qux").getRows(callbackFn);

filtre les lignes dont la colonne col1 est égale à 42, 50 ou 60:
db.query().from(apiUrl).select().where("col1", [42,50,60]).getRows(callbackFn); // le séparateur de decimale doit alors être un point
db.query().from(apiUrl).select().where("col1", "42,50,60").getRows(callbackFn); // le séparateur de decimale doit alors être un point

--
Mots clés

NULL - filtre les lignes dont la colonne col1 est égale à NULL:
db.query().from(apiUrl).select().where("col1", db.val.null).getRows(callbackFn);
db.query().from(apiUrl).select().where("col1", "{NULL}").getRows(callbackFn);

EMPTY - filtre les lignes dont la colonne col1 est vide (colonnes de type chaine):
db.query().from(apiUrl).select().where("col1", db.val.empty).getRows(callbackFn);
db.query().from(apiUrl).select().where("col1", "{EMPTY}").getRows(callbackFn);

-------
OPTIONS

withIds - retourne les lignes avec les identifiants de colonnes en lettres:
db.query().from(apiUrl).select().withIds("alpha").getRows(callbackFn);

withIds - retourne les lignes avec les index des colonnes:
db.query().from(apiUrl).select().withIds("ordinal").getRows(callbackFn);

withDateFormat - retourne les lignes avec le format de date ISO:
db.query().from(apiUrl).select().withDateFormat("yyyy-MM-ddTHH:mm:ss").getRows(callbackFn);

withPagination - retourne les lignes sans les infos de pagination (plus rapide):
db.query().from(apiUrl).select().withPagination(false).getRows(callbackFn);

-----------------
DONNEES ASSOCIEES

Les données associées (relatedData) sont les données servant à constituter les listes de valeurs.

retourne toutes les données associées sauf autocomplete:
db.query().from(apiUrl).list("*").getRelatedData(callbackFn);

retourne les données associées avec l'id "40a2c6":
db.query().from(apiUrl).list("40a2c6").getRelatedData(callbackFn);

retourne les données associées avec l'id "40a2c6" et dont la valeur contient "fr":
db.query().from(apiUrl).list("40a2c6").where("fr").getRelatedData(callbackFn);

*/

/** @namespace */
var db = db || {};
(function()
{
    "use strict";

    // dependencies
    if(typeof utility.http === "undefined") throw "utility.http is missing";

    /**
     * Requete sur une source de données (utility).
     * @returns {db.Query}
     */
    db.query = function()
    {
        return new db.Query();
    };

    /**
     * Requete sur une source de données.
     * @constructor
     * @requires utility.http
     *
     * @example
     * db.query().from(url).select("firstname", "name").where("name", "dupont").orderBy("name").range(0, 15).getRows(function(response)
     * {
     *     for(var i=0; i < response.result.rows.length; i++)
     *     {
     *         console.log("row:", response.result.rows[i]);
     *     }
     * });
     *
     * @example
     * db.query().from(url).insert().values("name", "dupont").files(filesObject).insertRow(function(response)
     * {
     *     console.log(response);
     * });
     *
     * @example
     * db.query().from(url).update().values("name", "dupont").files(filesObject).updateRow(function(response)
     * {
     *     console.log(response);
     * });
     */
    db.Query = function()
    {
        this._options = {};

        // api url
        this._options.from = null;

        // type de requête
        // -1: indéfini
        //  0: select
        //  1: insert
        //  2: update
        //  3: delete
        this._options.queryType = -1;

        // query params
        this._options.columns = null;
        this._options.orderBy = [];
        this._options.skip = null;
        this._options.take = null;
        this._options.values = [];
        this._options.files = [];
        this._options.filesToDelete = [];
        this._options.wideFilter = [];
        this._options.filter = [];
        this._options.filterOps = [];
        this._options.filterKeys = null;

        // api options
        this._options.withIds = null;
        this._options.withDateFormat = null;
        this._options.withPagination = null;
        this._options.withFilterLink = null;
        this._options.withJsonp = null;
    };

    // ---

    /**
     * Définit ou retourne un ensemble d'options.
     * @param   {Object} [arguments]
     * @returns {Object|this}
     */
    db.Query.prototype.options = function()
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
    db.Query.prototype.from = function()
    {
        // () getter
        if(arguments.length === 0)
        {
            return this._options.from;
        }

        // (value) setter
        if(arguments.length === 1)
        {
            if(typeof arguments[0] !== "string" || arguments[0] === null || arguments[0].length === 0) return this;
            this._options.from = arguments[0];
            return this;
        }
    };

    /**
     * Utilisez de préférence les méthodes "select", "insert" ou "update". Définit ou retourne le type de requête.<br>
     * <br>
     * 0: SELECT<br>
     * 1: INSERT<br>
     * 2: UPDATE<br>
     * 3: LIST (relatedData)
     *
     * @param   {string} [arguments]
     * @returns {string|this}
     */
    db.Query.prototype.queryType = function()
    {
        // () getter
        if(arguments.length === 0)
        {
            return this._options.queryType;
        }

        // (value) setter
        if(arguments.length === 1)
        {
            if(typeof arguments[0] !== "number") return this;
            this._options.queryType = arguments[0];
            return this;
        }
    };

    /**
     * Utilisez de préférence la méthode "select". Définit ou retourne les colonnes de la séléction.
     * @param   {string} [arguments]
     * @returns {string|this}
     */
    db.Query.prototype.columns = function()
    {
        // () getter
        if(arguments.length === 0)
        {
            return this._options.columns;
        }

        // (value) setter
        if(arguments.length === 1)
        {
            this._options.columns = arguments[0];
            return this;
        }
    };

    /**
     * Ajoute ou retourne des colonnes de tri.
     * @param   {string} [arguments] - colonne ou colonne, direction
     * @returns {string|this}
     */
    db.Query.prototype.orderBy = function()
    {
        // () getter
        if(arguments.length === 0)
        {
            return this._options.orderBy;
        }

        // (col) setter
        if(arguments.length === 1)
        {
            if(this._options.queryType !== 0) return this;
            if(typeof arguments[0] !== "string" || arguments[0] === null || arguments[0].length === 0) return this;

            this._options.orderBy.push(arguments[0]);
            return this;
        }

        // (col, direction) setter
        if(arguments.length === 2)
        {
            if(this._options.queryType !== 0) return this;
            if(typeof arguments[0] !== "string" || arguments[0] === null || arguments[0].length === 0) return this;
            if(typeof arguments[1] !== "string" || arguments[1] === null || arguments[1].length === 0) return this;

            var col = arguments[0];
            switch(arguments[1])
            {
                 case "A":
                 case "a":
                 case "asc": col += "|A"; break;

                 case "D":
                 case "d":
                 case "desc": col += "|D"; break;
            }
            this._options.orderBy.push(col);
            return this;
        }
    };

    /**
     * Définit ou retourne le nombre de lignes à ignorer.
     * @param   {number} [arguments]
     * @returns {number|this}
     */
    db.Query.prototype.skip = function()
    {
        // () getter
        if(arguments.length === 0)
        {
            return this._options.skip;
        }

        // (value) setter
        if(arguments.length === 1)
        {
            if(this._options.queryType !== 0) return this;

            this._options.skip = arguments[0];
            return this;
        }
    };

    /**
     * Définit ou retourne le nombre de lignes à retourner.
     * @param   {number} [arguments]
     * @returns {number|this}
     */
    db.Query.prototype.take = function()
    {
        // () getter
        if(arguments.length === 0)
        {
            return this._options.take;
        }

        // (value) setter
        if(arguments.length === 1)
        {
            if(this._options.queryType !== 0) return this;

            this._options.take = arguments[0];
            return this;
        }
    };

    /**
     * Ajoute ou retourne les valeurs pour une requête de type INSERT ou UPDATE.<br>
     * <br>
     * 1 param -> liste de valeurs indéxées par l'id de la colonne<br>
     * 2 params -> 0=id de la colonne, 1=valeur
     *
     * @param   {any} [arguments]
     * @returns {any|this}
     */
    db.Query.prototype.values = function()
    {
        // () getter
        if(arguments.length === 0)
        {
            return this._options.values;
        }

        // (values) setter
        if(arguments.length === 1)
        {
            if(this._options.queryType !== 1 && this._options.queryType !== 2) return this;
            if(typeof arguments[0] !== "object" || arguments[0] === null) return this;

            this._options.values.push(arguments[0]);
            return this;
        }

        // (key, value) setter
        if(arguments.length === 2)
        {
            if(typeof arguments[0] !== "string" || arguments[0] === null || arguments[0].length === 0) return this;

            var value = {};
            value[arguments[0]] = arguments[1];

            this._options.values.push(value);
            return this;
        }
    };

    /**
     * Ajoute ou retourne les fichiers pour une requête de type INSERT ou UPDATE.<br>
     * <br>
     * 1 param -> FileList indéxées par l'id de la colonne<br>
     * 2 params -> 0=id de la colonne, 1=FileList
     *
     * @param   {any} [arguments]
     * @returns {any|this}
     */
    db.Query.prototype.files = function()
    {
        // () getter
        if(arguments.length === 0)
        {
            return this._options.files;
        }

        // (files) setter
        if(arguments.length === 1)
        {
            if(this._options.queryType !== 1 && this._options.queryType !== 2) return this;
            if(typeof arguments[0] !== "object" || arguments[0] === null) return this;

            this._options.files.push(arguments[0]);
            return this;
        }

        // (key, file) setter
        if(arguments.length === 2)
        {
            if(typeof arguments[0] !== "string" || arguments[0] === null || arguments[0].length === 0) return this;

            var files = {};
            files[arguments[0]] = arguments[1];

            this._options.files.push(files);
            return this;
        }
    };

    /**
     * Ajoute ou retourne les noms des fichiers à supprimer pour une requête de type UPDATE.<br>
     * <br>
     * 1 param -> noms de fichiers indéxés par l'id de la colonne<br>
     * 2 param -> 0=id de la colonne, 1=noms de fichier
     *
     * @param   {any} [arguments]
     * @returns {any|this}
     */
    db.Query.prototype.filesToDelete = function()
    {
        // () getter
        if(arguments.length === 0)
        {
            return this._options.filesToDelete;
        }

        // (files) setter
        if(arguments.length === 1)
        {
            if(this._options.queryType !== 1 && this._options.queryType !== 2) return this;
            if(typeof arguments[0] !== "object" || arguments[0] === null) return this;

            this._options.filesToDelete.push(arguments[0]);
            return this;
        }

        // (key, file) setter
        if(arguments.length === 2)
        {
            if(typeof arguments[0] !== "string" || arguments[0] === null || arguments[0].length === 0) return this;

            var files = {};
            files[arguments[0]] = arguments[1];

            this._options.filesToDelete.push(files);
            return this;
        }
    };

    /**
     * Utilisez de préférence la méthode "where". Ajoute ou retourne le filtre large.
     * @param   {string} [arguments]
     * @returns {string|this}
     */
    db.Query.prototype.wideFilter = function()
    {
        // () getter
        if(arguments.length === 0)
        {
            return this._options.wideFilter;
        }

        // (value) setter
        if(arguments.length === 1)
        {
            if(!(this._options.queryType === 0 || this._options.queryType === 2 || this._options.queryType === 3)) return this;
            if(typeof arguments[0] !== "string" || arguments[0] === null || arguments[0].length === 0) return this;

            this._options.wideFilter.push(arguments[0]);
            return this;
        }
    };

    /**
     * Utilisez de préférence la méthode "where". Ajoute ou retourne le filtre.<br>
     * <br>
     * 1 param -> objet clé/valeur<br>
     * 2 param -> 0=id de la colonne, 1=valeur
     *
     * @param   {any} [arguments]
     * @returns {any|this}
     */
    db.Query.prototype.filter = function()
    {
        // () getter
        if(arguments.length === 0)
        {
            return this._options.filter;
        }

        // (filter object) setter
        if(arguments.length === 1)
        {
            if(this._options.queryType !== 0 && this._options.queryType !== 2) return this;
            if(typeof arguments[0] !== "object" || arguments[0] === null) return this;

            this._options.filter.push(arguments[0]);
            return this;
        }

        // (key, value) setter
        if(arguments.length === 2)
        {
            if(this._options.queryType !== 0 && this._options.queryType !== 2) return this;
            if(typeof arguments[0] !== "string" || arguments[0] === null || arguments[0].length === 0) return this;

            var filter = {};
            filter[arguments[0]] = arguments[1];

            this._options.filter.push(filter);
            return this;
        }
    };

    /**
     * Utilisez de préférence la méthode "where". Ajoute ou retourne les opérateurs de filtre.<br>
     * <br>
     * 1 param -> objet clé/valeur<br>
     * 2 param -> 0=id de la colonne, 1=valeur
     *
     * @param   {any} [arguments]
     * @returns {any|this}
     */
    db.Query.prototype.filterOps = function()
    {
        // () getter
        if(arguments.length === 0)
        {
            return this._options.filterOps;
        }

        // (object) setter
        if(arguments.length === 1)
        {
            if(this._options.queryType !== 0 && this._options.queryType !== 2) return this;
            if(typeof arguments[0] !== "object" || arguments[0] === null) return this;

            this._options.filterOps.push(arguments[0]);
            return this;
        }

        // (key, op) setter
        if(arguments.length === 2)
        {
            if(this._options.queryType !== 0 && this._options.queryType !== 2) return this;
            if(typeof arguments[0] !== "string" || arguments[0] === null || arguments[0].length === 0) return this;

            var opFilter = {};
            opFilter[arguments[0]] = arguments[1];

            this._options.filterOps.push(opFilter);
            return this;
        }
    };

    /**
     * Utilisez de préférence la méthode "where". Définit ou retourne le filtre sur les clés.
     * @param   {string} [arguments]
     * @returns {string|this}
     */
    db.Query.prototype.filterKeys = function()
    {
        // () getter
        if(arguments.length === 0)
        {
            return this._options.filterKeys;
        }

        // (value) setter
        if(arguments.length === 1)
        {
            if(typeof arguments[0] === "undefined" || arguments[0] === null || arguments[0].length === 0) return this;
            this._options.filterKeys = arguments[0];
            return this;
        }
    };

    /**
     * Définit ou retourne l'option spécifiant le type d'identifiant de colonne.
     * @param   {boolean} [arguments]
     * @returns {boolean|this}
     */
    db.Query.prototype.withIds = function()
    {
        // () getter
        if(arguments.length === 0)
        {
            return this._options.withIds;
        }

        // (value) setter
        if(arguments.length === 1)
        {
            if(typeof arguments[0] !== "string" || arguments[0] === null || arguments[0].length === 0) return this;
            this._options.withIds = arguments[0];
            return this;
        }
    };

    /**
     * Définit ou retourne l'option spécifiant le format de date.
     * @param   {boolean} [arguments]
     * @returns {boolean|this}
     */
    db.Query.prototype.withDateFormat = function()
    {
        // () getter
        if(arguments.length === 0)
        {
            return this._options.withDateFormat;
        }

        // (value) setter
        if(arguments.length === 1)
        {
            if(typeof arguments[0] !== "string" || arguments[0] === null || arguments[0].length === 0) return this;
            this._options.withDateFormat = arguments[0];
            return this;
        }
    };

    /**
     * Définit ou retourne l'option spécifiant si la liste des pages doit être retournée (n'affecte pas 'range').
     * @param   {boolean} [arguments]
     * @returns {boolean|this}
     */
    db.Query.prototype.withPagination = function()
    {
        // () getter
        if(arguments.length === 0)
        {
            return this._options.withPagination;
        }

        // (value) setter
        if(arguments.length === 1)
        {
            if(typeof arguments[0] !== "boolean") return this;
            this._options.withPagination = arguments[0];
            return this;
        }
    };

    /**
     * Définit ou retourne l'option spécifiant que le filtre est de type 'and' ou 'or'.
     * @param   {boolean} [arguments]
     * @returns {boolean|this}
     */
    db.Query.prototype.withFilterLink = function()
    {
        // () getter
        if(arguments.length === 0)
        {
            return this._options.withFilterLink;
        }

        // (value) setter
        if(arguments.length === 1)
        {
            if(typeof arguments[0] !== "string" || arguments[0] === null || arguments[0].length === 0) return this;
            this._options.withFilterLink = arguments[0];
            return this;
        }
    };

    /**
     * Définit ou retourne l'option spécifiant que l'appel est de type JSONP.
     * @param   {boolean} [arguments]
     * @returns {boolean|this}
     */
    db.Query.prototype.withJsonp = function()
    {
        // () getter
        if(arguments.length === 0)
        {
            return this._options.withJsonp;
        }

        // (value) setter
        if(arguments.length === 1)
        {
            if(typeof arguments[0] !== "boolean") return this;
            this._options.withJsonp = arguments[0];
            return this;
        }
    };

    /**
     * Définit le type de requête à LIST (getRelatedData) avec l'identifiant de liste.
     * @param   {string} [arguments]
     * @returns {string|this}
     */
    db.Query.prototype.list = function(id)
    {
        // () getter
        if(arguments.length === 0)
        {
            return this._options.list;
        }

        // (value) setter
        if(arguments.length === 1)
        {
            this._options.queryType = 3;
            this._options.list = arguments[0];
            return this;
        }
    };

    // ---

    /**
     * Définit le type de requête à SELECT et la liste des colonnes en retour.
     * @param   {string} cols - liste des colonnes dans la sélection
     * @returns {this}
     */
    db.Query.prototype.select = function(cols)
    {
        if(typeof cols !== "undefined" && cols !== null) this.columns(cols);
        this.queryType(0);
        return this;
    };

    /**
     * Définit le type de requête à INSERT.
     * @returns {this}
     */
    db.Query.prototype.insert = function()
    {
        this.queryType(1);
        return this;
    };

    /**
     * Définit le type de requête à UPDATE.<br>
     * note: la ou les clés doivent faire partie des valeurs même si une clause 'where' est ajoutée
     *
     * @returns {this}
     */
    db.Query.prototype.update = function()
    {
        this.queryType(2);
        return this;
    };

    /**
     * Définit le type de requête de modification.
     * @param   {string} type - type de requête (INSERT ou UPDATE)
     * @returns {this}
     */
    db.Query.prototype.save = function(type)
    {
        if(type === "insert")
        {
            this.queryType(1);
        }
        else
        {
            this.queryType(2);
        }
        return this;
    };

    /**
     * Définit le range pour retourner la première ligne.
     * @returns {this}
     */
    db.Query.prototype.first = function()
    {
        this.skip(0);
        this.take(1);

        return this;
    };

    /**
     * Définit l'index de la première ligne et le nombre de lignes à retourner.
     * @param   {number} skip
     * @param   {number} take
     * @returns {this}
     */
    db.Query.prototype.range = function(skip, take)
    {
        if(typeof skip !== "undefined" && skip !== null) this.skip(skip);
        if(typeof take !== "undefined" && take !== null) this.take(take);

        return this;
    };

    /**
     * Définit un filtre.<br>
     * <br>
     * 1 param  -> objet de valeurs indéxées par l'id de la colonne OU chaine de valeur de recherche large<br>
     * 2 params -> 0=id de la colonne, 1=valeur de la recherche OU 0=objet liste de valeur, 1=objet liste d'opérateurs<br>
     * 3 params -> 0=id de la colonne, 1=opérateur, 2=valeur
     *
     * @param   {any} [arguments]
     * @returns {this}
     */
    db.Query.prototype.where = function()
    {
        // check query type
        if(!(this._options.queryType === 0 || this._options.queryType === 2 || this._options.queryType === 3)) return this;

        // no values
        if(arguments.length === 0) return this;

        // type
        var arg0Type = typeof arguments[0];

        // 1 param
        if(arguments.length === 1)
        {
            // valeurs indéxées
            if(arg0Type === "object")
            {
                this.filter(arguments[0]);
            }

            // filter wide
            else if((arg0Type === "string" || arg0Type === "number") && arguments[0].length > 0)
            {
                this.wideFilter(arguments[0]);
            }
        }

        // 2 params
        else if(arguments.length === 2)
        {
            // paire clé/valeur
            if(arg0Type === "string")
            {
                this.filter(arguments[0], arguments[1]);
            }

            // collection de valeurs / collection d'opérateurs
            else
            {
                this.filter(arguments[0]);
                this.filterOps(arguments[1]);
            }
        }

        // 3 params
        else if(arguments.length === 3)
        {
            this.filter(arguments[0], arguments[2]);
            this.filterOps(arguments[0], arguments[1]);
        }

        return this;
    };

    /**
     * Définit le filtre sur les clés.
     * @param   {string} val
     * @returns {this}
     */
    db.Query.prototype.whereKeys = function(val)
    {
        // check query type
        if(this._options.queryType !== 0) return this;

        if(typeof val === "undefined" || val === null || val.length === 0) return this;

        this.filterKeys(val);

        return this;
    };

    // ---

    /**
     * Définit les options de filtrage, tri et pagination depuis un chemin.<br>
     * <br>
     * - o:<column-id>, tri (order by)<br>
     * - s:<val>, index de la première ligne à retourner (skip)<br>
     * - t:<val>, nombre de lignes à retourner (take)<br>
     * - w:<val>, valeur de filtre large (where <columns> like '%<val>%')<br>
     * - w:<column-id>:<val>, valeur de filtre sur la colonne (where <column-id>=<val>)<br>
     * - w:<column-id>:<operator>:<val>, valeur de filtre sur la colonne (where <column-id><operator><val>)<br>
     * - i:<key>, filtre sur les clés (whereKeys)
     *
     * @example
     * // recherche "robert" dans toutes les colonnes, ordonne les résultat par "name", commence à l'index 15 et retourne 30 résultats maximum
     * db.query().from(url).select("firstname", "name").loadOptions("/w:robert/o:name/s:15/t:30").getRows(function(response)
     * {
     *     // DO something
     * }
     *
	 * @param   {string} str
     * @returns {this}
	 */
	db.Query.prototype.loadOptions = function(arg)
	{
        var argType = typeof arg;
        if(argType === "undefined") return this;
        if(argType === "string") return setOptionsFromPath(this, arg);
        if(argType === "object") return setOptionsFromCollection(this, arg);
        return this;
    };

    /**
     * Définit les options de filtrage, tri et pagination depuis un chemin.<br>
     * @private
     * @memberof db.Query
     * @param   {db.Query} query - instance en cours
     * @param   {string} str
     * @returns {db.Query}
	 */
    var setOptionsFromPath = function(query, str)
	{
		var pairs = str.split('/');
		for(var i=0; i < pairs.length; i++)
		{
			var pair = pairs[i];
			var pairArr = pair.split(':');
			if(pairArr.length > 1)
			{
				var key = pairArr[0];
				if(key === "o" || key === "orderby")
				{
					query.orderBy(pairArr[1]);
				}
				else if(key === "s" || key === "skip")
				{
					query.skip(pairArr[1]);
				}
				else if(key === "t" || key === "take")
				{
					query.take(pairArr[1]);
				}
				else if(key === "i" || key === "id")
				{
					query.whereKeys(pairArr[1]);
				}
				else if(key === "w" || key === "where")
				{
					if(pairArr.length == 2)
					{
						// cols like 'value'
						query.where(decodeURIComponent(pairArr[1]));
					}
					else if(pairArr.length == 3)
					{
						// col = value
						query.where(pairArr[1], decodeURIComponent(pairArr[2]));
					}
					else if(pairArr.length == 4)
					{
						// col operator value
						query.where(pairArr[1], pairArr[2], decodeURIComponent(pairArr[3]));
					}
				}
				else if(key === "m" || key === "mode")
				{
					query.save(pairArr[1]);
				}
			}
		}
        return query;
	};

    /**
     * Définit les options de filtrage, tri et pagination depuis un chemin.
     * @private
     * @memberof db.Query
     * @param   {db.Query} query - instance en cours
	 * @param   {object} options
     * @returns {db.Query}
	 */
	var setOptionsFromCollection = function(query, options)
	{
        var str = [];
        for(var i=0; i < options.keys.length; i++)
        {
            var key = options.keys[i];
            var value = options.values[key];

            if(key === "orderBy")
            {
                query.orderBy(value);
            }
            else if(key === "skip")
            {
                query.skip(value);
            }
            else if(key === "take")
            {
                query.take(value);
            }
            else if(key === "whereKeys")
            {
                query.whereKeys(value);
            }
            else if(key === "where")
            {
                for(var y=0; y < value.length; y++)
                {
                    var whereVals = value[y];
                    if(whereVals.length == 1)
                    {
                        query.where(decodeURIComponent(whereVals[0]));
                    }
                    else if(whereVals.length == 2)
                    {
                        query.where(whereVals[0], decodeURIComponent(whereVals[1]));
                    }
                    else if(whereVals.length == 3)
                    {
                        query.where(whereVals[0], whereVals[1], decodeURIComponent(whereVals[2]));
                    }
                }
            }
            else if(key === "save")
            {
                query.save(value);
            }
        }
        return query;
    };

    /**
     * Retourne une collection d'options depuis un chemin.
	 * @param   {string} str
     * @returns {object}
	 */
	db.query.getOptionsFromPath = function(str)
	{
		var options = { keys: [], values: {} };
		var pairs = str.split('/');
		for(var i=0; i < pairs.length; i++)
		{
			var pair = pairs[i];
			var pairArr = pair.split(':');
			if(pairArr.length > 1)
			{
				var key = pairArr[0];
				if(key === "o" || key === "orderby")
				{
                    options.keys.push("orderBy");
					options.values.orderBy = pairArr[1];
				}
				else if(key === "s" || key === "skip")
				{
                    options.keys.push("skip");
					options.values.skip = pairArr[1];
				}
				else if(key === "t" || key === "take")
				{
                    options.keys.push("take");
					options.values.take = pairArr[1];
				}
				else if(key === "i" || key === "id")
				{
                    options.keys.push("whereKeys");
					options.values.whereKeys = pairArr[1];
				}
				else if(key === "w" || key === "where")
				{
					if(typeof options.values.where !== "object")
                    {
                        options.keys.push("where");
                        options.values.where = [];
                    }

                    if(pairArr.length == 2)
					{
						// cols like 'value'
						options.values.where.push([decodeURIComponent(pairArr[1])]);
					}
					else if(pairArr.length == 3)
					{
						// col = value
						options.values.where.push([pairArr[1], decodeURIComponent(pairArr[2])]);
					}
					else if(pairArr.length == 4)
					{
						// col operator value
						options.values.where.push([pairArr[1], pairArr[2], decodeURIComponent(pairArr[3])]);
					}
				}
				else if(key === "m" || key === "mode")
				{
					options.keys.push("save");
					options.values.save = pairArr[1];
				}
			}
		}

        // retourne un booleen indiquant si la clé existe
        options.containsKey = function(k)
        {
            return options.keys.indexOf(k) > -1;
        };

		return options;
	};

    /**
     * Retourne un chemin depuis une collection d'options.
	 * @param   {object} options
     * @returns {string}
	 */
	db.query.getPathFromOptions = function(options)
	{
        var str = [];
        for(var i=0; i < options.keys.length; i++)
        {
            var key = options.keys[i];
            var value = options.values[key];

            if(value === null || value.length === 0) continue;

            if(key === "orderBy")
            {
                str.push("o:" + value);
            }
            else if(key === "skip")
            {
                str.push("p:" + value);
            }
            else if(key === "take")
            {
                str.push("n:" + value);
            }
            else if(key === "whereKeys")
            {
                str.push("i:" + value);
            }
            else if(key === "where")
            {
                for(var y=0; y < value.length; y++)
                {
                    var whereVals = value[y];
                    if(whereVals.length == 1)
                    {
                        if(whereVals[0] === null || whereVals[0].length === 0) continue;
                        str.push("w:" + encodeURIComponent(whereVals[0]));
                    }
                    else if(whereVals.length == 2)
                    {
                        if(whereVals[1] === null || whereVals[1].length === 0) continue;
                        str.push("w:" + whereVals[0] + ":" + encodeURIComponent(whereVals[1]));
                    }
                    else if(whereVals.length == 3)
                    {
                        if(whereVals[2] === null || whereVals[2].length === 0) continue;
                        str.push("w:" + whereVals[0] + ":" + whereVals[1] + ":" + encodeURIComponent(whereVals[2]));
                    }
                }
            }
            else if(key === "save")
            {
                str.push("m:" + value);
            }
        }

        return str.length === 0 ?  "" : "/" + str.join('/');
    };

    // ---

    /**
     * Retourne le schema et les données de liste (relatedData) correspondant à la requête SELECT.
     * @param  {Function} [callbackFn] - fonction de callback en cas de réussite
     * @param  {Function} [callbackError] - fonction de callback en cas d'erreur
     * @param  {any} [callbackParam] - paramètre à passer aux fonctions de callback
     */
    db.Query.prototype.getSchema = function(callbackFn, callbackError, callbackParam)
    {
        // check query type
        if(this._options.from === null) throw "l'url est manquante";
        if(this._options.queryType !== 0) throw "cette requête n'est pas compatible avec cette action";

        // params
        var params = {};
        params.ame = "get-schema,get-related-data";

        if(this._options.columns !== null) params.acs = this._options.columns;
        if(this._options.withIds !== null) params.aot = this._options.withIds;

        // http method
        var method = this._options.withJsonp === true ? "jsonp" : "get";

        // get response
        utility.http().url(this._options.from).query(params).send(method, callback, callback, {fn: callbackFn, error: callbackError, param: callbackParam});
    };

    /**
     * Retourne les données de liste associées à la source de données (relateData).
     * @param  {Function} [callbackFn] - fonction de callback en cas de réussite
     * @param  {Function} [callbackError] - fonction de callback en cas d'erreur
     * @param  {any} [callbackParam] - paramètre à passer aux fonctions de callback
     */
    db.Query.prototype.getRelatedData = function(callbackFn, callbackError, callbackParam)
    {
        // check query type
        if(this._options.from === null) throw "l'url est manquante";
        if(this._options.queryType !== 3) throw "cette requête n'est pas compatible avec cette action --- 3";

        // params
        var params = {};
        params.ame = "get-related-data";
        if(this._options.list !== null && this._options.list.length > 0) params.als = this._options.list;
        if(this._options.wideFilter !== null && this._options.wideFilter.length > 0) params.alf = this._options.wideFilter;

        // http method
        var method = this._options.withJsonp === true ? "jsonp" : "get";

        // get response
        utility.http().url(this._options.from).query(params).send(method, callback, callback, {fn: callbackFn, error: callbackError, param: callbackParam});
    };

    /**
     * Retourne les lignes correspondant à la requête SELECT.
     * @param  {Function} [callbackFn] - fonction de callback en cas de réussite
     * @param  {Function} [callbackError] - fonction de callback en cas d'erreur
     * @param  {any} [callbackParam] - paramètre à passer aux fonctions de callback
     */
    db.Query.prototype.getRows = function(callbackFn, callbackError, callbackParam)
    {
        // check query type
        if(this._options.queryType !== 0) throw "cette requête n'est pas compatible avec cette action";

        // params
        var params = getSelectParams(this._options);
        params.ame = "get-rows";

        // http method
        var method = this._options.withJsonp === true ? "jsonp" : "get";

        // get response
        utility.http().url(this._options.from).query(params).send(method, callback, callback, {fn: callbackFn, error: callbackError, param: callbackParam});
    };

    /**
     * Parcoure les lignes correspondant à la requête SELECT.
     * @param  {Function} fn - fonction executée à chaque ligne
     */
    db.Query.prototype.eachRows = function(fn)
    {
        // check query type
        if(this._options.queryType !== 0) throw "cette requête n'est pas compatible avec cette action";

        // params
        var params = getSelectParams(this._options);
        params.ame = "get-rows";

        // http method
        var method = this._options.withJsonp === true ? "jsonp" : "get";

        // get response
        utility.http().url(this._options.from).query(params).send(method, callback, callback, {
            fn: function(response)
            {
                for(var i=0; i < response.result.rows.length; i++)
                {
                    var row = response.result.rows[i];
                    var result = fn(row);
                    if(result === false) break;
                }
            }
        });
    };

    /**
     * Retourne les lignes et le schema correspondant à la requête SELECT.
     * @param  {Function} [callbackFn] - fonction de callback en cas de réussite
     * @param  {Function} [callbackError] - fonction de callback en cas d'erreur
     * @param  {any} [callbackParam] - paramètre à passer aux fonctions de callback
     */
    db.Query.prototype.getRowsAndSchema = function(callbackFn, callbackError, callbackParam)
    {
        // check query type
        if(this._options.queryType !== 0) throw "cette requête n'est pas compatible avec cette action";

        // params
        var params = getSelectParams(this._options);
        params.ame = "get-schema,get-related-data,get-rows";

        // http method
        var method = this._options.withJsonp === true ? "jsonp" : "get";

        // get response
        utility.http().url(this._options.from).query(params).send(method, callback, callback, {fn: callbackFn, error: callbackError, param: callbackParam});
    };

    /**
     * Retourne un fichier d'export au format CSV correspondant à la requête SELECT.
     */
    db.Query.prototype.getRowsCsv = function()
    {
        // check query type
        if(this._options.queryType !== 0) throw "cette requête n'est pas compatible avec cette action";

        // params
        var params = getSelectParams(this._options);
        params.ame = "get-rows-csv";

        // get response
        utility.http().url(this._options.from).query(params).iframe();
    };

    /**
     * Retourne les stats correspondant à la requête SELECT.
     * @param  {Function} [callbackFn] - fonction de callback en cas de réussite
     * @param  {Function} [callbackError] - fonction de callback en cas d'erreur
     * @param  {any} [callbackParam] - paramètre à passer aux fonctions de callback
     */
    db.Query.prototype.getStats = function(callbackFn, callbackError, callbackParam)
    {
        // check query type
        if(this._options.queryType !== 0) throw "cette requête n'est pas compatible avec cette action";

        // params
        var params = getSelectParams(this._options);
        params.ame = "get-stats";

        // http method
        var method = this._options.withJsonp === true ? "jsonp" : "get";

        // get response
        utility.http().url(this._options.from).query(params).send(method, callback, callback, {fn: callbackFn, error: callbackError, param: callbackParam});
    };

    /**
     * Retourne une ligne à partir des clés correspondant à la requête SELECT.
     * @param  {Function} [callbackFn] - fonction de callback en cas de réussite
     * @param  {Function} [callbackError] - fonction de callback en cas d'erreur
     * @param  {any} [callbackParam] - paramètre à passer aux fonctions de callback
     */
    db.Query.prototype.getRow = function(callbackFn, callbackError, callbackParam)
    {
        // check query type
        if(this._options.queryType !== 0) throw "cette requête n'est pas compatible avec cette action";

        // params
        var params = {};
        params.ame = "get-row";

        if(this._options.columns !== null) params.acs = this._options.columns;
        if(this._options.filterKeys !== null) params.apk = this._options.filterKeys;

        if(this._options.withIds !== null) params.aot = this._options.withIds;
        if(this._options.withDateFormat !== null) params.adf = this._options.withDateFormat;

        // http method
        var method = this._options.withJsonp === true ? "jsonp" : "get";

        // get response
        utility.http().url(this._options.from).query(params).send(method, callback, callback, {fn: callbackFn, error: callbackError, param: callbackParam});
    };

    /**
     * Retourne la ligne insérée correspondant à la requête INSERT.
     * @param  {Function} [callbackFn] - fonction de callback en cas de réussite
     * @param  {Function} [callbackError] - fonction de callback en cas d'erreur
     * @param  {any} [callbackParam] - paramètre à passer aux fonctions de callback
     */
    db.Query.prototype.insertRow = function(callbackFn, callbackError, callbackParam)
    {
        // check query type
        if(this._options.queryType !== 1) throw "cette requête n'est pas compatible avec cette action";

        // params
        var params = getEditParams(this._options);
        params.ame = "insert-row";

        // get response
        if(this._options.withJsonp === true)
        {
            addValuesParams(params, this._options.values);
            utility.http().url(this._options.from).query(params).jsonp(callback, callback, {fn: callbackFn, error: callbackError, param: callbackParam});
        }
        else
        {
            var postData = getPostData(this._options.values, this._options.files);
            utility.http().url(this._options.from).query(params).data(postData).post(callback, callback, {fn: callbackFn, error: callbackError, param: callbackParam});
        }
    };

    /**
     * Retourne le nombre de lignes affectées correspondant à la requête UPDATE.
     * @param  {Function} [callbackFn] - fonction de callback en cas de réussite
     * @param  {Function} [callbackError] - fonction de callback en cas d'erreur
     * @param  {any} [callbackParam] - paramètre à passer aux fonctions de callback
     */
    db.Query.prototype.updateRow = function(callbackFn, callbackError, callbackParam)
    {
        // check query type
        if(this._options.queryType !== 2) throw "cette requête n'est pas compatible avec cette action";

        // params
        var params = getEditParams(this._options);
        params.ame = "update-row";

        // get response
        if(this._options.withJsonp === true)
        {
            addValuesParams(params, this._options.values);
            utility.http().url(this._options.from).query(params).jsonp(callback, callback, {fn: callbackFn, error: callbackError, param: callbackParam});
        }
        else
        {
            var postData = getPostData(this._options.values, this._options.files, this._options.filesToDelete);
            utility.http().url(this._options.from).query(params).data(postData).post(callback, callback, {fn: callbackFn, error: callbackError, param: callbackParam});
        }
    };

    /**
     * Retourne le résultat d'une requête d'enregistrement.
     * @param  {Function} [callbackFn] - fonction de callback en cas de réussite
     * @param  {Function} [callbackError] - fonction de callback en cas d'erreur
     * @param  {any} [callbackParam] - paramètre à passer aux fonctions de callback
     */
    db.Query.prototype.saveRow = function(callbackFn, callbackError, callbackParam)
    {
        if(this._options.queryType === 1)
        {
            this.insertRow(callbackFn, callbackError, callbackParam);
        }
        else if(this._options.queryType === 2)
        {
            this.updateRow(callbackFn, callbackError, callbackParam);
        }
    };

    /**
     * Retourne le nombre de lignes affectées correspondant à la requête DELETE.
     * @param  {Function} [callbackFn] - fonction de callback en cas de réussite
     * @param  {Function} [callbackError] - fonction de callback en cas d'erreur
     * @param  {any} [callbackParam] - paramètre à passer aux fonctions de callback
     */
    db.Query.prototype.deleteRow = function(callbackFn, callbackError, callbackParam)
    {
        // check query type
        if(this._options.from === null) throw "l'url est manquante";
        if(this._options.queryType !== 3) throw "cette requête n'est pas compatible avec cette action";

        // TODO
        console.warn("not implemented");
    };

    // ---

    /**
     * Retourne les paramètres d'une requête SELECT.
     * @private
     * @memberof db.Query
     * @param   {Object} options
     * @returns {Object}
     */
    var getSelectParams = function(options)
    {
        // params
        var params = {};
        if(options.columns !== null) params.acs = options.columns;
        if(options.skip !== null) params.api = options.skip;
        if(options.take !== null) params.apq = options.take;
        if(options.orderBy.length > 0) params.aso = options.orderBy.join(',');
        if(options.wideFilter.length > 0) params.afv = options.wideFilter.join(',');
        if(options.filterKeys !== null) params.apk = options.filterKeys;

        // options
        if(options.withIds !== null) params.aot = options.withIds;
        if(options.withDateFormat !== null) params.adf = options.withDateFormat;
        if(options.withPagination !== null) params.apg = options.withPagination;
        if(options.withFilterLink !== null) params.afl = options.withFilterLink;

        // filter
        addFilterParams(params, options.filter, options.filterOps);

        return params;
    };

    /**
     * Retourne les paramètres d'une requête INSERT ou UPDATE.
     * @private
     * @memberof db.Query
     * @param   {Object} options
     * @returns {Object}
     */
    var getEditParams = function(options)
    {
        // params
        var params = {};
        if(options.wideFilter.length > 0) params.afv = options.wideFilter;

        // options
        if(options.withIds !== null) params.aot = options.withIds;
        if(options.withDateFormat !== null) params.adf = options.withDateFormat;

        // filter
        addFilterParams(params, options.filter, options.filterOps);

        return params;
    };

    /**
     * Ajoute les paramètres de filtre aux paramètres.
     * @private
     * @memberof db.Query
     * @param  {any} params
     * @param  {any} filterValues
     * @param  {any} opValues
     */
    var addFilterParams = function(params, filterValues, opValues)
    {
        // values
        for(var i=0; i < filterValues.length; i++)
        {
            var currentWhere = filterValues[i];
            for (var itemKey in currentWhere)
            {
                if(!currentWhere.hasOwnProperty(itemKey)) continue;
                var itemValue = currentWhere[itemKey];

                if(itemValue === null || itemValue.length === 0) continue;
                params["afv-" + itemKey] = itemValue;
            }
        }

        // filter ops
        for(var z=0; z < opValues.length; z++)
        {
            var currentOp = opValues[z];
            for (var itemKeyOp in currentOp)
            {
                if(!currentOp.hasOwnProperty(itemKeyOp)) continue;
                var itemValueOp = currentOp[itemKeyOp];

                if(itemValueOp === null || itemValueOp.length === 0 || itemValueOp === db.ops.equal) continue;
                params["afo-" + itemKeyOp] = itemValueOp;
            }
        }
    };

    /**
     * Ajoute les paramètres de valeur aux paramètres.
     * @private
     * @memberof db.Query
     * @param  {any} params
     * @param  {any} values
     */
    var addValuesParams = function(params, values)
    {
        // values
        for(var x=0; x < values.length; x++)
        {
            var currentValues = values[x];
            for (var currentKey in currentValues)
            {
                if(!currentValues.hasOwnProperty(currentKey)) continue;
                if(currentKey.substr(0, 2) === "__") continue;

                var currentValue = currentValues[currentKey];
                if(typeof currentValue === "undefined" || currentValue === null) currentValue = "{NULL}";

                params["ar0-" + currentKey] = currentValue;
            }
        }
    };

    /**
     * Retourne l'objet FormData en vue d'un POST pour les requête INSERT ou UPDATE.
     * @private
     * @memberof db.Query
     * @param  {any} values
     * @param  {any} files
     * @param  {any} delFiles
     */
    var getPostData = function(values, files, delFiles)
    {
        // return
        var data = new FormData();

        // values
        for(var x=0; x < values.length; x++)
        {
            var currentValues = values[x];
            for (var currentKey in currentValues)
            {
                if(!currentValues.hasOwnProperty(currentKey)) continue;
                if(currentKey.substr(0, 2) === "__") continue;

                var currentValue = currentValues[currentKey];
                if(typeof currentValue === "undefined" || currentValue === null) currentValue = "{NULL}";

                data.append("ar0-" + currentKey, currentValue);
            }
        }

        // files
        for(var z=0; z < files.length; z++)
        {
            var currentFiles = files[z];
            for (var currentFile in currentFiles)
            {
                if(!currentFiles.hasOwnProperty(currentFile)) continue;
                var currentFileList = currentFiles[currentFile];
                for(var y=0; y < currentFileList.length; y++)
                {
                    data.append("ar0-" + currentFile + "-files-" + y, currentFileList[y]);
                }
            }
        }

        // files delete
        if(typeof delFiles !== "undefined")
        {
            for(var w=0; w < delFiles.length; w++)
            {
                var currentDelFiles = delFiles[w];
                for (var currentDelKey in currentDelFiles)
                {
                    if(!currentDelFiles.hasOwnProperty(currentDelKey)) continue;
                    var currentDelFileNames = currentDelFiles[currentDelKey];
                    if(currentDelFileNames.length > 0) data.append("ar0-" + currentDelKey + "-delfiles", currentDelFileNames.join(','));
                }
            }
        }

        return data;
    };

    // ---

    /**
     * Fonction callback globale, detecte les retours en erreur.
     * @private
     * @memberof db.Query
     * @param  {Object} apiReturn
     * @param  {Object} callbackInfos
     */
    var callback = function(apiReturn, callbackInfos)
    {
        // reponse mal formatée
        if(typeof apiReturn.responses === "undefined")
        {
            throwError("la réponse est manquante ou non conforme");
            return;
        }

        // reponses
        for(var i=0; i < apiReturn.responses.length; i++)
        {
            var response = apiReturn.responses[i];

            // OK
            if(response.status === 0)
            {
                if (typeof callbackInfos.fn === "function") callbackInfos.fn(response, callbackInfos.param);
                continue;
            }

            // --ERROR--

            // error throw
            var errorMessage = "";
            var errorText = "";
            if(typeof response.error !== "undefined")
            {
                errorMessage = response.error.message;
                errorText = response.error.text;
            }
            throwError(errorMessage, errorText);

            // error callback
            if (typeof callbackInfos.error === "function") callbackInfos.error(response, callbackInfos.param);
        }
    };

    /**
     * Error messages.
     * @private
     * @memberof db.Query
     * @param  {string} message
     * @param  {string} text
     */
    var throwError = function(message, text)
    {
        // contents
        var consoleMessage = ["[db.query] une erreur est survenue"];
        var nofificationMessage = ["Une erreur est survenue"];
        if(typeof message === "string" && message !== null && message.length > 0)
        {
            consoleMessage.push(message);
            nofificationMessage.push(message);
        }
        if(typeof text === "string" && text !== null && text.length > 0)
        {
            consoleMessage.push(text);
        }

        // console
        console.error(consoleMessage.join('\n\n'));

        // notification
        if(typeof ui !== "undefined" && typeof ui.notification !== "undefined")
        {
            ui.notification.hideAllWait();
            ui.notification().type("error").messages(nofificationMessage).show();
        }
    };

    // ---

    /**
     * Operators.
     * @private
     * @memberof db.Query
     */
    db.ops = {
        equal:       "eqa", // TODO: delete
        equals:      "eqa",
        contains:    "inv",
        starts:      "str",
        ends:        "end",
        greater:     "sup",
        less:        "inf",
        between:     "int",
        notEqual:    "eqan", // TODO: delete
        notEquals:   "eqan",
        notContains: "invn",
        notStarts:   "strn",
        notEnds:     "endn",
        notBetween:  "intn"
    };

    /**
     * Special values.
     * @private
     * @memberof db.Query
     */
    db.val = {
        "null": "{NULL}",
        "empty": "{EMPTY}"
    };

})();
