/**@module visibility-listener*/
modules.define('visibility-listener', ['visibility'], function (provide, Visibility) {
    "use strict";

    /**
     * @mixin VisibilityListener
     * @extends BEMDOM
     */
    var VisibilityListener = /** @lends VisibilityListener */{

        onSetMod: {
            js: {
                inited: function () {
                    this.__base();
                    if (!this.isVisible()) {
                        Visibility.addInvisibleBlock(this);
                    }
                }
            }
        },

        /**
         * @returns {boolean}
         */
        isVisible: function () {
            return this.domElem.is(':visible');
        },

        /**
         * @returns {VisibilityListener}
         */
        update: function () {
            if (!this.isVisible()) {
                Visibility.addInvisibleBlock(this);
                return this;
            } else {
                return this._update();
            }
        },

        /**
         * @returns {VisibilityListener}
         * @protected
         */
        _update: function () {
            return this;
        }
    };

    provide(VisibilityListener);
});
