import { Button } from "./Button";

export const AllButtons = () => (
  <div className="p-8 dark:text-white">
    <div className="mb-4 border-b-4 pb-4">
      <h1>Buttons variants:</h1>
      <Button>Click Me</Button>
      <Button variant="alternative">Click Me</Button>
      <Button variant="dark">Click Me</Button>
      <Button variant="light">Click Me</Button>
      <Button variant="green">Click Me</Button>
      <Button variant="red">Click Me</Button>
      <Button variant="yellow">Click Me</Button>
      <Button variant="purple">Click Me</Button>
    </div>
    <div className="mb-4 border-b-4 pb-4">
      <h1>Buttons sizes:</h1>
      <Button size="xsmall">Click Me</Button>
      <Button size="small">Click Me</Button>
      <Button size="base">Click Me</Button>
      <Button size="large">Click Me</Button>
      <Button size="xlarge">Click Me</Button>
    </div>
  </div>
);
