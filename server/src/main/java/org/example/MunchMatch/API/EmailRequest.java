package org.example.MunchMatch.API;

public class EmailRequest {
    private String emailAddress;
    private String resultLink;

    public EmailRequest() {}
    public EmailRequest(String emailAddress, String resultLink) {
        this.emailAddress = emailAddress;
        this.resultLink = resultLink;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public String getResultLink() {
        return resultLink;
    }

    public void setResultLink(String resultLink) {
        this.resultLink = resultLink;
    }

    @Override
    public String toString() {
        return "EmailRequest{" +
                "emailAddress='" + emailAddress + '\'' +
                ", resultId=" + resultLink +
                '}';
    }
}
