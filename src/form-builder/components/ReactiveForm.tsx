import {
  DEFAULT_THEME,
  Grid,
  LoadingOverlay,
  MantineNumberSize,
  Modal,
  ModalProps,
  Paper,
  Tabs,
  TabsListProps,
  Title,
} from "@mantine/core";
import { ColSpan } from "@mantine/core/lib/Grid/Col/Col.styles";
import events from "@mongez/events";
import { RestfulEndpoint } from "@mongez/http";
import { trans } from "@mongez/localization";
import { Form, FormControl, FormInterface } from "@mongez/react-form";
import { useEvent, useForceUpdate, useOnce } from "@mongez/react-hooks";
import { Random, get } from "@mongez/reinforcements";
import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { Wrapper } from "../../components/FormModal/style";
import { toastError, toastLoading } from "../../components/Toast";
import { getMoonlightConfig } from "../../config";
import { parseError } from "./../../utils/parse-error";
import {
  CachedRender,
  Callbacks,
  OnErrorCallback,
  ReactiveFormComponentProps,
  ReactiveFormEvent,
  SaveCallback,
  SubmitCallback,
} from "./../types";
import { FormButton } from "./FormButton";
import { FormTab } from "./FormTab";
import { InputBuilder } from "./InputBuilder";
import {
  cancelButton,
  resetButton,
  saveAndClearButton,
  submitButton,
} from "./form-buttons-list";

export class ReactiveForm {
  /**
   * Form Record Object
   */
  protected record: any = null;

  /**
   * React form id
   */
  public id = Random.string(32);

  /**
   * Form handler
   */
  public form!: FormInterface;

  /**
   * Service that will be used form saving
   */
  protected _service?: RestfulEndpoint;

  /**
   * Buttons list
   */
  protected buttonsList: FormButton[] = [];

  /**
   * Submit handler
   * Used if service is not provided
   */
  protected _submit?: SubmitCallback;

  /**
   * Submit format
   */
  protected _submitFormat: "json" | "formData" = getMoonlightConfig(
    "reactiveForm.submitFormat",
    "json",
  );

  /**
   * Callbacks list
   */
  protected callbacks: Callbacks = {
    onSubmit: [],
    onSave: [],
    onError: [],
  };

  /**
   * Enable keyboard shortcuts
   */
  protected _enableKeyboardShortcuts = true;

  /**
   * Default record Parameters
   * Works only when record is not set or empty
   */
  protected defaultRecordParameters: any = {};

  /**
   * Current wrapper either it is modal or static
   */
  protected wrapper: any;

  /**
   * Modal Wrapper
   */
  protected modalWrapper = Modal;

  /**
   * Form Wrapper when not in modal
   */
  protected formStaticWrapper = Paper;

  /**
   * Wrapper props
   */
  protected wrapperProps: any = {};

  /**
   * Whether to ignore empty values
   */
  protected _ignoreEmptyValues = true;

  /**
   * Default modal props
   */
  protected defaultModalProps: Partial<ModalProps> = {
    size: "md",
    overlayProps: {
      blur: 2,
      opacity: 0.2,
    },
    centered: true,
    trapFocus: false,
    transitionProps: {
      exitDuration: 300,
    },
  };

  /**
   * Default static form props
   */
  protected defaultStaticFormProps: any = {
    shadow: "sm",
    p: "sm",
    withBorder: true,
  };

  /**
   * Form Heading
   * If not set and single name and record are present, it will be translated based on the form type
   */
  protected _heading: React.ReactNode = null;

  /**
   * Form Single name
   */
  protected _singleName = "";

  /**
   * Translate with `the` for single name in update
   */
  protected _translateWithThe = true;

  /**
   * Enable/Disable Close Button
   */
  protected _closeButton = false;

  /**
   * Trigger button
   */
  protected _triggerButton: React.ReactNode = null;

  /**
   * Close button text
   */
  protected _closeButtonText: React.ReactNode = "";

  /**
   * Determine whether to enable save and clear button
   */
  protected _withSaveAndClearButton = false;

  /**
   * Determine whether to enable reset button
   */
  protected _withResetButton = false;

  /**
   * Inputs list
   */
  protected inputs: InputBuilder[] = [];

  /**
   * Auto focus on first input
   */
  protected autoFocusOnFirstInput = true;

  /**
   * Default col size for inputs
   */
  protected defaultColSize?: ColSpan = getMoonlightConfig(
    "reactiveForm.defaultColSize",
    12,
  );

  /**
   * Form tabs list
   */
  protected tabs: FormTab[] = [];

  /**
   * Open in modal
   */
  public openInModal: boolean = getMoonlightConfig(
    "reactiveForm.openInModal",
    false,
  );

  /**
   * Determine if current form is opened in modal
   */
  public opened = false;

  /**
   * Cached Content of the form
   */
  protected rendered: CachedRender = {
    heading: null,
    content: null,
  };

  /**
   * Record id to determine if it is update or create
   */
  protected _recordId?: number | string;

  /**
   * Current active tab name
   */
  public activeTab: string | null = "";

  /**
   * Close the form on save
   */
  protected _closeOnSave = true;

  /**
   * ReRender handler
   */
  protected reRenderer: any;

  /**
   * Tabs settings
   */
  public tabsSettings: {
    position: TabsListProps["position"];
    vertical: boolean;
  } = {
    position: "center",
    vertical: false,
  };

  /**
   * Set record id
   */
  public recordId(id: number | string | undefined) {
    this._recordId = id;
    return this;
  }

  /**
   * Determine whether to ignore empty values
   */
  public ignoreEmptyValues(ignore = true) {
    this._ignoreEmptyValues = ignore;
    return this;
  }

  /**
   * Determine whether to enable keyboard shortcuts
   */
  public enableKeyboardShortcuts(enable = true) {
    this._enableKeyboardShortcuts = enable;
    return this;
  }

  /**
   * Add buttons list
   */
  public buttons(buttons: FormButton[]) {
    this.buttonsList = buttons;
    return this;
  }

  /**
   * Just add a quick submit button with the given text
   */
  public submitButton(text: React.ReactNode) {
    this.buttonsList.push(submitButton(text));
    return this;
  }

  /**
   * Set submit format that will receive data when submitting data with services
   */
  public submitFormat(format: "json" | "formData") {
    this._submitFormat = format;
    return this;
  }

  /**
   * Determine wether to open in a modal
   */
  public inModal(openInModal = true) {
    this.openInModal = openInModal;

    // disable close button, reset and save and clear buttons
    // you may enable them manually after calling this method
    if (openInModal) {
      this.wrapper = this.modalWrapper;
    } else {
      this.wrapper = this.formStaticWrapper;
      this._closeButton = false;
      this._withResetButton = false;
      this._withSaveAndClearButton = false;
    }

    return this;
  }

  /**
   * Set the modal trigger button
   *
   * This can be used as a button to open the form directly instead of passing open and onClose props
   */
  public triggerButton(button: React.ReactNode) {
    this._triggerButton = button;
    return this;
  }

  /**
   * Set form size
   */
  public size(size: MantineNumberSize) {
    if (this.openInModal) {
      this.wrapperProps["size"] = size;
      delete this.wrapperProps["fullScreen"];
    } else {
      this.wrapperProps["style"] = {
        maxWidth: "100%",
      };

      if (typeof size === "number") {
        this.wrapperProps["w"] = size;
      } else {
        this.wrapperProps["w"] = DEFAULT_THEME.breakpoints[size];
      }
    }

    return this;
  }

  /**
   * Set shadow
   */

  /**
   * Set modal size as full screen
   */
  public fullScreen(openInFullScreen = true) {
    if (this.openInModal) {
      delete this.wrapperProps["size"];
      this.wrapperProps["fullScreen"] = openInFullScreen;
    } else {
      this.wrapperProps["style"] = {
        maxWidth: "100%",
      };
      this.wrapperProps["size"] = "md";
    }

    return this;
  }

  /**
   * Determine whether to close the modal using Esc key
   */
  public closeOnEscape(close = true) {
    this.wrapperProps.closeOnEscape = close;

    return this;
  }

  /**
   * {@alias} closeOnEscape
   */
  public esc(close = true) {
    return this.closeOnEscape(close);
  }

  /**
   * Close when click outside the modal or on the overlay
   */
  public closeByOverlay(close = true) {
    this.wrapperProps.closeOnClickOutside = close;

    return this;
  }

  /**
   * Get tab by name
   */
  public getTab(name: string): FormTab | undefined {
    return this.tabs.find(tab => tab.name() === name);
  }

  /**
   * Force re-rendering the form
   */
  public reRender() {
    if (this.reRenderer) {
      this.clearCache();
      this.reRenderer();
    }
  }

  /**
   * Close the form on save
   */
  public closeOnSave(closeOnSave = true) {
    this._closeOnSave = closeOnSave;
    return this;
  }

  /**
   * Set overlay opacity
   */
  public overlayOpacity(opacity: number) {
    if (!this.wrapperProps["overlayProps"]) {
      this.wrapperProps["overlayProps"] = {};
    }

    this.wrapperProps["overlayProps"]["opacity"] = opacity;
    return this;
  }

  /**
   * Determine whether to auto center the form
   */
  public centered(centered = true) {
    if (this.openInModal) {
      this.wrapperProps["centered"] = centered;
    } else {
      this.wrapperProps["m"] = centered ? "auto" : undefined;
    }

    return this;
  }

  /**
   * Determine whether to center tabs
   * Works only if tabs are present
   */
  public tabsPosition(tabPosition: TabsListProps["position"]) {
    this.tabsSettings.position = tabPosition;

    return this;
  }

  /**
   * Vertical tabs
   */
  public verticalTabs(isVertical = true) {
    this.tabsSettings.vertical = isVertical;

    return this;
  }

  /**
   * Set service
   */
  public service(service: RestfulEndpoint) {
    this._service = service;
    return this;
  }

  /**
   * Add more wrapper props
   */
  public addWrapperProps(props: any) {
    this.wrapperProps = { ...this.wrapperProps, ...props };
    return this;
  }

  /**
   * Add submit handler
   * Used if service is not set
   */
  public submitter(handler: SubmitCallback) {
    this._submit = handler;
    return this;
  }

  /**
   * Set on submit callback
   */
  public onSubmit(callback: SubmitCallback) {
    if (!this.callbacks.onSubmit.includes(callback)) {
      this.callbacks.onSubmit.push(callback);
    }

    return this;
  }

  /**
   * Trigger the given event
   */
  public trigger(eventName: ReactiveFormEvent, ...args: any[]) {
    return events.trigger(`reactiveForm.${this.id}.${eventName}`, ...args);
  }

  /**
   * Listen to the given event
   */
  public on(eventName: ReactiveFormEvent, callback: any) {
    return events.subscribe(`reactiveForm.${this.id}.${eventName}`, callback);
  }

  /**
   * On error callback
   */
  public onError(callback: OnErrorCallback) {
    if (!this.callbacks.onError.includes(callback)) {
      this.callbacks.onError.push(callback);
    }

    return this;
  }

  /**
   * On Save callback
   */
  public onSave(callback: SaveCallback) {
    if (!this.callbacks.onSave.includes(callback)) {
      this.callbacks.onSave.push(callback);
    }

    return this;
  }

  /**
   * Determine whether to enable close button beside save button
   */
  public withCloseButton(enable = true) {
    this._closeButton = enable;
    return this;
  }

  /**
   * Determine whether to enable save and clear button
   */
  public withSaveAndClearButton(enable = true) {
    this._withSaveAndClearButton = enable;
    return this;
  }

  /**
   * Determine whether to add a reset button
   */
  public withResetButton(enable = true) {
    this._withResetButton = enable;
    return this;
  }

  /**
   * Set form tabs
   */
  public setTabs(tabs: FormTab[]) {
    this.tabs = tabs;
    return this;
  }

  /**
   * Translate with `the` for single name in update
   */
  public translateWithThe(translateWithThe = true) {
    this._translateWithThe = translateWithThe;
    return this;
  }

  /**
   * Set form single name
   */
  public singleName(name: string) {
    this._singleName = name;
    return this;
  }

  /**
   * Set form heading
   */
  public heading(heading: React.ReactNode) {
    this._heading = heading;
    return this;
  }

  /**
   * Add form tabs
   */
  public addTabs(...tabs: FormTab[]) {
    this.tabs = [...this.tabs, ...tabs];
    return this;
  }

  /**
   * Clear cached content
   */
  public clearCache() {
    if (!this.rendered.content) return;

    this.rendered.heading = null;
    this.rendered.content = null;
    this.inputs.forEach(input => {
      input.setForm(this).clearCache().setRecord(this.record);
    });

    this.tabs.forEach(tab => {
      tab
        .setForm(this)
        .setRecord(this.record)
        .inputs()
        .forEach(input => {
          input.setForm(this).clearCache().setRecord(this.record);
        });
    });
  }

  /**
   * Set form record
   */
  public setRecord(record: any) {
    if (record?.id) {
      this._recordId = record.id;
    }

    const requiresClearingCache = Object.is(this.record, record) === false;

    this.record = record;

    if (requiresClearingCache) {
      this.clearCache();
    }

    return this;
  }

  /**
   * Get record object
   */
  public getRecord(key?: string, defaultValue?: any) {
    if (key) {
      return get(this.record, key, defaultValue);
    }

    return this.record;
  }

  /**
   * Get form input by name
   */
  public input(name: string): InputBuilder | undefined {
    return this.inputs.find(input => input.name() === name);
  }

  /**
   * Determine whether to auto focus on first input
   */
  public autoFocus(autoFocus = true) {
    this.autoFocusOnFirstInput = autoFocus;
    return this;
  }

  /**
   * Set default col size for all inputs
   */
  public col(size: ColSpan) {
    this.defaultColSize = size;
    return this;
  }

  /**
   * add inputs to the list
   */
  public setInputs(inputs: InputBuilder[]) {
    this.inputs = inputs;
    return this;
  }

  /**
   * Add input to the list
   */
  public addInputs(...inputs: InputBuilder[]) {
    this.inputs = [...this.inputs, ...inputs];
    return this;
  }

  /**
   * Render the inputs
   */
  public render() {
    if (this.rendered.content) {
      return this.rendered.content;
    }

    let InputBuildersContent: React.ReactNode = null;

    if (this.tabs.length > 0) {
      InputBuildersContent = this.renderTabs();
    } else {
      const inputs = this.inputs.map((input, index) => {
        this.interactWithInput(input, index);
        return (
          <React.Fragment key={index}>
            {input.setRecord(this.record).render()}
          </React.Fragment>
        );
      });

      InputBuildersContent = <Grid>{inputs}</Grid>;
    }

    if (this._closeButton) {
      if (!this.buttonsList.find(button => button.getName() === "close")) {
        this.buttonsList.push(cancelButton());
      }
    }

    if (this._withResetButton) {
      if (!this.buttonsList.find(button => button.getName() === "reset")) {
        this.buttonsList.push(resetButton());
      }
    }

    if (!this._recordId && this._withSaveAndClearButton) {
      if (
        !this.buttonsList.find(button => button.getName() === "saveAndClear")
      ) {
        this.buttonsList.push(saveAndClearButton());
      }
    }

    if (!this.buttonsList.find(button => button.getName() === "submit")) {
      this.buttonsList.push(submitButton());
    }

    const buttons = this.buttonsList.map((button, index) => {
      const Button = button.setReactiveForm(this).asComponent();

      return <Button key={index} />;
    });

    this.rendered.content = (
      <>
        {InputBuildersContent}
        <Wrapper>{buttons}</Wrapper>
      </>
    );

    setTimeout(() => {
      this.triggerRendered();
    }, 0);

    return this.rendered.content;
  }

  /**
   * Reset form data
   */
  public reset() {
    this.form.reset();

    this.focusOnFirstInput();
  }

  /**
   * Save and clear form
   */
  public saveAndClear() {
    const tempCloseOnSave = this._closeOnSave;
    this._closeOnSave = false;

    this.onSave(() => {
      this.form.reset();
      this._closeOnSave = tempCloseOnSave;

      this.focusOnFirstInput();
    });

    this.form.submit();
  }

  /**
   * Focus on first input
   */
  public focusOnFirstInput() {
    if (!this.autoFocusOnFirstInput) return;

    let input: FormControl | null = null;
    // check if its in tabs mode
    // if so focus on first input on first found tab that has inputs
    if (this.tabs.length > 0) {
      const foundTab = this.tabs.find(tab => tab.inputs().length > 0);

      if (foundTab) {
        const inputBuilder = foundTab.inputs()[0];
        input = inputBuilder.formControl;
      }

      if (!input && foundTab) {
        // find another tab
        const tab = this.tabs.find(
          tab => foundTab.id !== tab.id && tab.inputs().length > 0,
        );

        if (tab) {
          const inputBuilder = tab.inputs()[0];
          input = inputBuilder.formControl;
        }
      }
    } else {
      const inputBuilder = this.inputs[0];
      input = inputBuilder.formControl;
    }

    input?.focus();
  }

  /**
   * Trigger form close
   */
  public close() {
    this.trigger("close");
  }

  /**
   * Interact with input
   */
  protected interactWithInput(input: InputBuilder, index: number) {
    if (this.defaultColSize && !input.hasCol()) {
      input.col(this.defaultColSize);
    }

    if (this.autoFocusOnFirstInput && index === 0) {
      input.autoFocus();
    }
  }

  /**
   * Render form tabs
   */
  protected renderTabs() {
    const tabsHeadings: React.ReactNode[] = [];
    const tabsContent: React.ReactNode[] = [];

    const tabs = this.tabs.filter(tab => {
      if (typeof tab.shouldBeRendered === "function") {
        return tab.shouldBeRendered(this) === true;
      }

      return tab.shouldBeRendered;
    });

    tabs.forEach((tab, index) => {
      tab.setRecord(this.record);

      tab.inputs().forEach((input, inputIndex) => {
        this.interactWithInput(input, index === 0 && inputIndex === 0 ? 0 : -1);
      });

      tabsHeadings.push(
        <React.Fragment key={index}>{tab.renderHeading()}</React.Fragment>,
      );

      tabsContent.push(
        <React.Fragment key={index}>{tab.renderContent()}</React.Fragment>,
      );
    });

    if (!this.activeTab) {
      this.activeTab = tabs[0].name();
    }

    this.rendered.content = (
      <>
        <Tabs
          orientation={this.tabsSettings.vertical ? "vertical" : "horizontal"}
          onTabChange={this.goToTab.bind(this)}
          value={this.activeTab}>
          <Tabs.List position={this.tabsSettings.position}>
            {tabsHeadings}
          </Tabs.List>
          {tabsContent}
        </Tabs>
      </>
    );

    return this.rendered.content;
  }

  /**
   * Go to tab
   */
  public goToTab(tabName: string) {
    this.activeTab = tabName;
    this.reRender();
  }

  /**
   * Manage form submission
   */
  protected manageSubmitForm(
    setIslLoading: (loading: boolean) => void,
    onClose: () => void,
  ) {
    return async ({ form, values, formData }) => {
      this.callbacks.onSubmit.forEach(callback =>
        callback({
          form,
          values: values,
          reactiveForm: this,
          formData,
          setIslLoading,
        }),
      );

      let loader;

      try {
        setIslLoading(true);
        if (this._service) {
          let response: AxiosResponse<any>;
          loader = toastLoading(
            trans("moonlight.saving"),
            trans("moonlight.savingForm"),
          );
          const service = this._service;

          const data = this._submitFormat === "json" ? values : formData;

          if (this._recordId) {
            response = await service.update(this._recordId, data);
          } else {
            response = await service.create(data);
          }

          if (this._closeOnSave) {
            onClose();
          }

          const message = trans("moonlight.successFormSaved", {
            name: this.getTranslatedSingleName(),
          });

          loader.success(trans("moonlight.success"), message);

          setTimeout(() => {
            this.callbacks.onSave.forEach(callback => callback(response, this));
          }, getMoonlightConfig("reactiveForm.saveEventDelay", 100));

          form.submitting(false);
          setIslLoading(false);
        } else if (this._submit) {
          const response = await this._submit({
            form,
            values: values,
            reactiveForm: this,
            formData,
            setIslLoading,
          });
          if (this._closeOnSave) {
            onClose();
          }

          setTimeout(() => {
            this.callbacks.onSave.forEach(callback => callback(response, this));
          }, getMoonlightConfig("reactiveForm.saveEventDelay", 100));
        }
      } catch (error) {
        if (loader) {
          loader.error(parseError(error), trans("moonlight.saveFailed"));
        } else {
          toastError(parseError(error));
        }
        form.submitting(false);
        setIslLoading(false);
      }
    };
  }

  /**
   * Render heading
   */
  protected renderHeading() {
    if (this.rendered.heading) {
      return this.rendered.heading;
    }

    const heading =
      this._heading ||
      (this._singleName ? this.renderHeadingFromSingleName() : "");

    this.rendered.heading = heading;

    return this.rendered.heading;
  }

  /**
   * Render heading from single name
   */
  protected renderHeadingFromSingleName() {
    const translatedSingleName = this.getTranslatedSingleName();

    if (this._recordId) {
      return trans("moonlight.updateItem", {
        item: translatedSingleName,
      });
    }

    return trans("moonlight.createItem", {
      item: translatedSingleName,
    });
  }

  /**
   * Get translated single name
   */
  protected getTranslatedSingleName() {
    if (this._recordId) {
      return this._translateWithThe
        ? trans("the", { key: trans(this._singleName) })
        : trans(this._singleName);
    }

    return trans(this._singleName);
  }

  /**
   * Determine if form Has record id
   */
  public hasRecordId() {
    return !!this._recordId;
  }

  /**
   * Manage form error
   */
  public manageFormError(invalidFormControls: FormControl[]) {
    // focus on first invalid input
    const firstInvalidInput = invalidFormControls[0];

    if (this.tabs.length > 0) {
      for (const tab of this.tabs) {
        const input = tab
          .inputs()
          .find(input => input.name() === firstInvalidInput.name);

        if (input) {
          this.goToTab(tab.name());

          setTimeout(() => {
            input.focus();
          }, 0);
          break;
        }
      }
    } else {
      const input = this.inputs.find(
        input => input.name() === firstInvalidInput.name,
      );

      input?.focus();
    }
  }

  /**
   * Set form component
   */
  public setForm(form: FormInterface) {
    this.form = form;

    this.trigger("formReady", form);

    this.inputs.forEach(input => {
      input.setForm(this);
    });

    this.tabs.forEach(tab => {
      tab
        .setForm(this)
        .inputs()
        .forEach(input => {
          input.setForm(this);
        });
    });
  }

  /**
   * Trigger form is rendered
   */
  public triggerRendered() {
    this.trigger("rendered");

    for (const input of this.inputs) {
      input.rendered();
    }

    for (const tab of this.tabs) {
      tab.rendered();
    }
  }

  /**
   * Get form component wrapper
   */
  public getWrapper() {
    if (this.wrapper) {
      return this.wrapper;
    }

    return (this.wrapper = this.openInModal
      ? this.modalWrapper
      : this.formStaticWrapper);
  }

  /**
   * Return the form as component
   */
  public asComponent() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const reactiveForm = this;

    function Component({
      open = false,
      onClose,
      record: incomingRecord,
      recordId,
      rowIndex: _index,
      triggerButton,
      onSave,
      loading: incomingLoading,
      initialLoad,
      mapLoadedData,
      ...modalProps
    }: ReactiveFormComponentProps & Partial<ModalProps>) {
      const [isLoading, setIsLoading] = useState(false);
      const [record, setRecord] = useState(incomingRecord);
      const [opened, setOpen] = useState(open);

      reactiveForm.reRenderer = useForceUpdate();

      if (!onClose) {
        onClose = () => {
          setOpen(false);
        };
      }

      if (triggerButton) {
        reactiveForm._triggerButton = triggerButton;
      }

      if (!reactiveForm.record && record) {
        reactiveForm.record = record;
      }

      reactiveForm.opened = opened;

      useEffect(() => {
        if (!reactiveForm._service || !opened || !recordId) return;

        setIsLoading(true);

        reactiveForm._service.get(recordId).then(response => {
          const dataKey = getMoonlightConfig(
            "reactiveForm.singleRecordKey",
            "record",
          );
          const data: any = get(response.data, dataKey);
          reactiveForm.setRecord(data);
          setIsLoading(false);
        });
      }, [recordId, opened]);

      useEffect(() => {
        if (!initialLoad) return;

        setIsLoading(true);

        initialLoad().then(response => {
          reactiveForm.setRecord(mapLoadedData?.(response));
          setIsLoading(false);
        });
      }, []);

      useEffect(() => {
        if (incomingLoading !== undefined) {
          setIsLoading(incomingLoading);
        }
      }, [incomingLoading]);

      useEffect(() => {
        if (!reactiveForm._enableKeyboardShortcuts) return;
        if (reactiveForm.openInModal && !reactiveForm.opened) return;

        const handleKeyDown = (e: KeyboardEvent) => {
          // if pressed ctrl + s or in mac pressed cmd + s
          // then trigger form submit

          if ((e.ctrlKey || e.metaKey) && e.key === "s") {
            e.preventDefault();
            const form = reactiveForm.form;

            if (!form || form.isSubmitting()) return;

            form.submit();
          }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
          document.removeEventListener("keydown", handleKeyDown);
        };
      }, [opened]);

      useEffect(() => {
        if (reactiveForm.openInModal === false) return;
        if (incomingRecord === undefined) return;

        reactiveForm.setRecord(incomingRecord);
        setRecord(incomingRecord);

        if (!opened) {
          setTimeout(() => {
            reactiveForm.setRecord(undefined);
            setRecord(undefined);
            reactiveForm.activeTab = null;
          }, 400);
        }
      }, [opened, incomingRecord]);

      useEffect(() => {
        // if (reactiveForm.openInModal === true) return;

        reactiveForm.setRecord(incomingRecord);
        setRecord(incomingRecord);
      }, [incomingRecord]);

      useEffect(() => {
        if (open === undefined || reactiveForm.openInModal === false) return;

        setOpen(open);
      }, [open]);

      useEvent(() =>
        reactiveForm.on("close", () => {
          onClose?.();
          setTimeout(() => {
            reactiveForm.clearCache();
          }, 300);
        }),
      );

      useOnce(() => {
        if (onSave) {
          reactiveForm.onSave(onSave);
        }

        reactiveForm.trigger("rendering", reactiveForm);
      });

      const heading = reactiveForm.renderHeading();

      const shouldBeRendered = reactiveForm.openInModal
        ? Boolean(opened || reactiveForm.rendered.content)
        : true;

      const content = shouldBeRendered ? reactiveForm.render() : null;

      const Wrapper = reactiveForm.getWrapper();

      const wrapperProps = reactiveForm.openInModal
        ? {
            title: <strong>{heading}</strong>,
            styles: theme => ({
              header: {
                borderBottom: `1px solid ${
                  theme.colorScheme === "light"
                    ? theme.colors.gray[4]
                    : theme.colors.dark[5]
                }`,
              },
            }),
            opened: opened,
            ...reactiveForm.defaultModalProps,
            ...reactiveForm.wrapperProps,
            ...modalProps,
            onClose: () => {
              reactiveForm.close();
              setOpen(false);
            },
          }
        : {
            ...reactiveForm.defaultStaticFormProps,
            ...reactiveForm.wrapperProps,
            ...modalProps,
          };

      const modalTrigger = reactiveForm.openInModal ? (
        <>
          <span onClick={() => setOpen(true)}>
            {reactiveForm._triggerButton}
          </span>
        </>
      ) : null;

      return (
        <>
          {modalTrigger}
          <Wrapper {...wrapperProps}>
            {!reactiveForm.openInModal && (
              <Title px="xl" align="center">
                {heading}
              </Title>
            )}
            <LoadingOverlay visible={isLoading} />
            <Form
              ignoreEmptyValues={reactiveForm._ignoreEmptyValues}
              onError={reactiveForm.manageFormError.bind(reactiveForm)}
              ref={form => {
                reactiveForm.setForm(form as FormInterface);
              }}
              onSubmit={reactiveForm.manageSubmitForm(
                setIsLoading,
                reactiveForm.close.bind(reactiveForm),
              )}>
              {content}
            </Form>
          </Wrapper>
        </>
      );
    }

    Component.defaultProps = {
      record: this.defaultRecordParameters,
    };

    return React.memo(Component);
  }
}
