import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
  code: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  code,
}) => (
  <div>
    <h1>Welcome{firstName}! verify OTP to continue</h1>
    <br />
    <h3>{code}</h3>
  </div>
);
