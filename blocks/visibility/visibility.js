/**@module visibility*/
modules.define('visibility', ['events__channels'], function (provide, channels) {
    "use strict";

    var Visibility = {

        /**
         * @property
         * @type {Array}
         * @private
         */
        _invisibleBlocks: [],

        /**
         * @param {VisibilityListener} block
         */
        addInvisibleBlock: function (block) {
            if (this._invisibleBlocks.indexOf(block) < 0) {
                this._invisibleBlocks.push(block);
            }
        },

        /**
         * @public
         */
        handleChanges: function () {
            var invisibleBlocks = [],
                block;
            //we can't here 1. use this._invisibleBlocks.filter 2. cache this._invisibleBlocks.length
            //because Visibility.addInvisibleElement can be called during the cycle
            for (var i = 0; i < this._invisibleBlocks.length; i++) {
                block = this._invisibleBlocks[i];
                if (block.isVisible()) {
                    block.update();
                } else {
                    invisibleBlocks.push(block);
                }
            }
            this._invisibleBlocks = invisibleBlocks;
        }
    };

    channels('visibility').on('show', Visibility.handleChanges, Visibility);

    provide(Visibility);
});
