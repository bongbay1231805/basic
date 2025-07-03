"use strict";
window.addEventListener("DOMContentLoaded", () => {
    const menu = new Accordion("#menu");
});
class Accordion {
    /**
     * @param el CSS selector of the accordion
     */
    constructor(el) {
        var _a;
        /** Accordion item array */
        this.items = [];
        this.el = document.querySelector(el);
        const itemEls = Array.from(((_a = this.el) === null || _a === void 0 ? void 0 : _a.querySelectorAll("details")) || []);
        itemEls.forEach((itemEl, i) => {
            const id = `${i}`;
            itemEl.setAttribute("data-item", id);
            this.items.push(new AccordionItem(id, this));
        });
    }
}
class AccordionItem {
    /**
     * @param id ID of the accordion item
     * @param parent Accordion object to which the item belongs
     */
    constructor(id, parent) {
        var _a, _b, _c, _d;
        /** Element is collapsing */
        this.isCollapsing = false;
        /** Element is expanding */
        this.isExpanding = false;
        /** Animation duration and easing */
        this.animParams = {
            duration: 500,
            easing: "cubic-bezier(0.33,1,0.68,1)"
        };
        /** Actions to run after expanding the item. */
        this.animActionsExpand = {
            onfinish: this.onAnimationFinish.bind(this, true),
            oncancel: () => { this.isExpanding = false; }
        };
        /** Actions to run after collapsing the item. */
        this.animActionsCollapse = {
            onfinish: this.onAnimationFinish.bind(this, false),
            oncancel: () => { this.isCollapsing = false; }
        };
        this.parent = parent;
        this.el = (_a = this.parent.el) === null || _a === void 0 ? void 0 : _a.querySelector(`[data-item="${id}"]`);
        this.summary = (_b = this.el) === null || _b === void 0 ? void 0 : _b.querySelector("summary");
        (_c = this.summary) === null || _c === void 0 ? void 0 : _c.addEventListener("click", this.toggle.bind(this));
        this.content = (_d = this.summary) === null || _d === void 0 ? void 0 : _d.nextElementSibling;
    }
    /** Close any open items. */
    closePrevious() {
        const openItems = this.parent.items.filter(item => { var _a; return item.isExpanding || ((_a = item.el) === null || _a === void 0 ? void 0 : _a.open); });
        openItems === null || openItems === void 0 ? void 0 : openItems.forEach(item => item.collapse());
    }
    /**
     * Open or close the accordion.
     * @param e Click event whose default behavior should be prevented
     */
    toggle(e) {
        var _a, _b, _c, _d, _e;
        e === null || e === void 0 ? void 0 : e.preventDefault();
        (_a = this.el) === null || _a === void 0 ? void 0 : _a.classList.remove("collapsing", "expanding");
        const detailsClicked = (e === null || e === void 0 ? void 0 : e.target).parentElement;
        const dataItemClicked = detailsClicked === null || detailsClicked === void 0 ? void 0 : detailsClicked.getAttribute("data-item");
        const detailsOpen = (_c = (_b = this.el) === null || _b === void 0 ? void 0 : _b.parentElement) === null || _c === void 0 ? void 0 : _c.querySelector("[open]");
        const dataItemOpen = detailsOpen === null || detailsOpen === void 0 ? void 0 : detailsOpen.getAttribute("data-item");
        if (dataItemClicked !== dataItemOpen) {
            // run the pre-toggle action only if a different item is clicked
            this.closePrevious();
        }
        if (this.isCollapsing || !((_d = this.el) === null || _d === void 0 ? void 0 : _d.open)) {
            this.open();
        }
        else if (this.isExpanding || ((_e = this.el) === null || _e === void 0 ? void 0 : _e.open)) {
            this.collapse();
        }
    }
    /** Open the item and run the animation for expanding. */
    open() {
        if (this.el) {
            this.el.style.height = `${this.el.offsetHeight}px`;
            this.el.open = true;
            this.expand();
        }
    }
    /** Expansion animation */
    expand() {
        var _a, _b, _c, _d, _e, _f;
        (_a = this.el) === null || _a === void 0 ? void 0 : _a.classList.add("expanding");
        this.isExpanding = true;
        const startHeight = ((_b = this.el) === null || _b === void 0 ? void 0 : _b.offsetHeight) || 0;
        const summaryHeight = ((_c = this.summary) === null || _c === void 0 ? void 0 : _c.offsetHeight) || 0;
        const contentHeight = ((_d = this.content) === null || _d === void 0 ? void 0 : _d.offsetHeight) || 0;
        const endHeight = summaryHeight + contentHeight;
        (_e = this.animation) === null || _e === void 0 ? void 0 : _e.cancel();
        this.animation = (_f = this.el) === null || _f === void 0 ? void 0 : _f.animate({ height: [`${startHeight}px`, `${endHeight}px`] }, this.animParams);
        if (this.animation) {
            this.animation.onfinish = this.animActionsExpand.onfinish;
            this.animation.oncancel = this.animActionsExpand.oncancel;
        }
    }
    /** Close the item and run the animation for collapsing. */
    collapse() {
        var _a, _b, _c, _d, _e;
        (_a = this.el) === null || _a === void 0 ? void 0 : _a.classList.add("collapsing");
        this.isCollapsing = true;
        const startHeight = ((_b = this.el) === null || _b === void 0 ? void 0 : _b.offsetHeight) || 0;
        const endHeight = ((_c = this.summary) === null || _c === void 0 ? void 0 : _c.offsetHeight) || 0;
        (_d = this.animation) === null || _d === void 0 ? void 0 : _d.cancel();
        this.animation = (_e = this.el) === null || _e === void 0 ? void 0 : _e.animate({ height: [`${startHeight}px`, `${endHeight}px`] }, this.animParams);
        if (this.animation) {
            this.animation.onfinish = this.animActionsCollapse.onfinish;
            this.animation.oncancel = this.animActionsCollapse.oncancel;
        }
    }
    /** Actions to run when the animation is finished */
    onAnimationFinish(open) {
        if (this.el) {
            this.el.open = open;
            if (this.animation) {
                this.animation = null;
            }
            this.isCollapsing = false;
            this.isExpanding = false;
            this.el.style.height = "";
            this.el.classList.remove("collapsing", "expanding");
        }
    }
}