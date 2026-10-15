import { Label } from "./label";
import { useState } from "react";
import { Input } from "./input";
import { Button } from "./button";
import { Dialog } from "./dialog";

export const meta = {
  title: "Dialog",
  description:
    "Generic dialog. No explicit cancel — dismiss via the top-right close button, overlay click, or Escape.",
};

export const Default = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <Dialog.Header>
          <Dialog.Title>Example Modal</Dialog.Title>
          <Dialog.Description>This is a useful description</Dialog.Description>
        </Dialog.Header>
        <form className="contents">
          <div>
            <Label>Test</Label>
            <Input />
          </div>
          <div>
            <Label>Test</Label>
            <Input />
          </div>
        </form>
        <Dialog.Actions>
          <Button variant="primary" onClick={() => setOpen(false)}>
            Done
          </Button>
        </Dialog.Actions>
      </Dialog>
    </>
  );
};

export const Wide = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Dialog size="large" open={open} onOpenChange={setOpen}>
        <Dialog.Header>
          <Dialog.Title>Example Modal</Dialog.Title>
          <Dialog.Description>This is a useful description</Dialog.Description>
        </Dialog.Header>
        <form className="contents">
          <div>
            <Label>Test</Label>
            <Input />
          </div>
          <div>
            <Label>Test</Label>
            <Input />
          </div>
        </form>
        <Dialog.Actions>
          <Button variant="primary" onClick={() => setOpen(false)}>
            Done
          </Button>
        </Dialog.Actions>
      </Dialog>
    </>
  );
};

export const HiddenDescription = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <Dialog.Header>
          <Dialog.Title>Example Modal</Dialog.Title>
          <Dialog.Description visuallyHidden>
            This is a useful description
          </Dialog.Description>
        </Dialog.Header>
        <form className="contents">
          <div>
            <Label>Test</Label>
            <Input />
          </div>
          <div>
            <Label>Test</Label>
            <Input />
          </div>
        </form>
        <Dialog.Actions>
          <Button variant="primary" onClick={() => setOpen(false)}>
            Done
          </Button>
        </Dialog.Actions>
      </Dialog>
    </>
  );
};

export const SecondaryActions = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <Dialog.Header>
          <Dialog.Title>Example Modal</Dialog.Title>
          <Dialog.Description>This is a useful description</Dialog.Description>
        </Dialog.Header>
        <form className="contents">
          <div>
            <Label>Test</Label>
            <Input />
          </div>
          <div>
            <Label>Test</Label>
            <Input />
          </div>
        </form>
        <Dialog.Actions>
          <Button onClick={() => setOpen(false)}>One</Button>
          <Button onClick={() => setOpen(false)}>Two</Button>
          <Dialog.Actions.Secondary>
            <Button>Secondary One</Button>
            <Button>Secondary Two</Button>
          </Dialog.Actions.Secondary>
        </Dialog.Actions>
      </Dialog>
    </>
  );
};
