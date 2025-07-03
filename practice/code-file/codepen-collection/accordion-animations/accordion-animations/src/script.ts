window.addEventListener("DOMContentLoaded",() => {
	const menu = new Accordion("#menu");
});

class Accordion {
	/** Element used for this accordion */
	el: HTMLElement | null;
	/** Accordion item array */
	items: AccordionItem[] = [];
	/**
	 * @param el CSS selector of the accordion
	 */
	constructor(el: string) {
		this.el = document.querySelector(el);

		const itemEls = Array.from(this.el?.querySelectorAll("details") || []);

		itemEls.forEach((itemEl,i) => {
			const id = `${i}`;
			itemEl.setAttribute("data-item",id)
			this.items.push(new AccordionItem(id,this));
		});
	}
}
class AccordionItem {
	/** Accordion object to which the item belongs */
	parent: Accordion;
	/** `<details>` used for the accordion item */
	el: HTMLDetailsElement | null | undefined;
	/** `<summary>` of the `<details>` */
	summary: HTMLElement | null | undefined;
	/** Content element succeeding the `<summary>` */
	content: HTMLElement | null | undefined;
	/** Element is collapsing */
	isCollapsing = false;
	/** Element is expanding */
	isExpanding = false;
	/** Animation object */
	animation?: Animation | null;
	/** Animation duration and easing */
	animParams: AnimParams = {
		duration: 500,
		easing: "cubic-bezier(0.33,1,0.68,1)"
	};
	/** Actions to run after expanding the item. */
	animActionsExpand: AnimActions = {
		onfinish: this.onAnimationFinish.bind(this,true),
		oncancel: () => { this.isExpanding = false; }
	};
	/** Actions to run after collapsing the item. */
	animActionsCollapse: AnimActions = {
		onfinish: this.onAnimationFinish.bind(this,false),
		oncancel: () => { this.isCollapsing = false; }
	};
	/** Close any open items. */
	closePrevious(): void {
		const openItems = this.parent.items.filter(item => item.isExpanding || item.el?.open);
		openItems?.forEach(item => item.collapse());
	}
	/**
	 * @param id ID of the accordion item
	 * @param parent Accordion object to which the item belongs
	 */
	constructor(id: string, parent: Accordion) {
		this.parent = parent;
		this.el = this.parent.el?.querySelector(`[data-item="${id}"]`);
		this.summary = this.el?.querySelector("summary");
		this.summary?.addEventListener("click", this.toggle.bind(this));
		this.content = this.summary?.nextElementSibling as HTMLElement;
	}
	/**
	 * Open or close the accordion.
	 * @param e Click event whose default behavior should be prevented
	 */
	toggle(e?: Event) {
		e?.preventDefault();
		this.el?.classList.remove("collapsing","expanding");

		const detailsClicked = (e?.target as HTMLElement).parentElement;
		const dataItemClicked = detailsClicked?.getAttribute("data-item");
		const detailsOpen = this.el?.parentElement?.querySelector("[open]");
		const dataItemOpen = detailsOpen?.getAttribute("data-item");

		if (dataItemClicked !== dataItemOpen) {
			// run the pre-toggle action only if a different item is clicked
			this.closePrevious();
		}
		if (this.isCollapsing || !this.el?.open) {
			this.open();
		} else if (this.isExpanding || this.el?.open) {
			this.collapse();
		}
	}
	/** Open the item and run the animation for expanding. */
	open(): void {
		if (this.el) {
			this.el.style.height = `${this.el.offsetHeight}px`;
			this.el.open = true;

			this.expand();
		}
	}
	/** Expansion animation */
	expand(): void {
		this.el?.classList.add("expanding");
		this.isExpanding = true;

		const startHeight = this.el?.offsetHeight || 0;
		const summaryHeight = this.summary?.offsetHeight || 0;
		const contentHeight = this.content?.offsetHeight || 0;
		const endHeight = summaryHeight + contentHeight;
		
		this.animation?.cancel();
		this.animation = this.el?.animate(
			{ height: [`${startHeight}px`, `${endHeight}px`] },
			this.animParams
		);
		if (this.animation) {
			this.animation.onfinish = this.animActionsExpand.onfinish;
			this.animation.oncancel = this.animActionsExpand.oncancel;
		}
	}
	/** Close the item and run the animation for collapsing. */
	collapse(): void {
		this.el?.classList.add("collapsing");
		this.isCollapsing = true;

		const startHeight = this.el?.offsetHeight || 0;
		const endHeight = this.summary?.offsetHeight || 0;

		this.animation?.cancel();
		this.animation = this.el?.animate(
			{ height: [`${startHeight}px`, `${endHeight}px`] },
			this.animParams
		);
		if (this.animation) {
			this.animation.onfinish = this.animActionsCollapse.onfinish;
			this.animation.oncancel = this.animActionsCollapse.oncancel;
		}
	}
	/** Actions to run when the animation is finished */
	onAnimationFinish(open: boolean): void {
		if (this.el) {
			this.el.open = open;

			if (this.animation) {
				this.animation = null;
			}
			this.isCollapsing = false;
			this.isExpanding = false;
			this.el.style.height = "";
			this.el.classList.remove("collapsing","expanding");
		}
	}
}
type AnimActions = {
	onfinish: () => void,
	oncancel: () => void
}
type AnimParams = {
	duration: number,
	easing: string
}