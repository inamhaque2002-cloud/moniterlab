# Security Incident Response Plan  
**Project:** MySecureApp  
**Last updated:** January 2026  
**Current version:** 1.0

## Purpose
Quickly detect, contain, eradicate, recover from, and learn from security incidents while minimizing damage and reputation loss.

## Team Roles & Responsibilities

| Role                        | Who (name/GitHub)         | Responsibilities                                                                 |
|-----------------------------|---------------------------|----------------------------------------------------------------------------------|
| Incident Commander          | (you/project lead)        | Overall coordination, decisions, communication                                 |
| Security Analyst / First Responder | (you/dev)              | Initial triage, evidence collection, containment                                |
| Developer / Code Owner      | (you/dev team)            | Code fixes, patch development, deployment                                        |
| Communication Lead          | (you/project lead)        | Notify stakeholders, write public statements if needed                          |
| Legal / Compliance (optional) | —                       | GDPR/data breach notification, contracts, insurance                             |
| External Help (if needed)   | —                         | Security company, CERT, law enforcement                                          |

## Severity Levels

| Level | Name            | Impact                                      | Response Time Goal       | Example                                      |
|-------|-----------------|---------------------------------------------|---------------------------|----------------------------------------------|
| 1     | Critical        | Active data breach / RCE / full control     | Immediate (within 30 min) | Database dumped, admin account taken over    |
| 2     | High            | Possible breach / stolen credentials / DoS  | Within 4 hours            | Successful SQLi, leaked API keys             |
| 3     | Medium          | Vulnerability with PoC, suspicious logs     | Within 24 hours           | XSS, exposed .env file, scanning attempts    |
| 4     | Low             | Best practice issues, theoretical risks     | Within 1 week             | Missing headers, outdated dependencies       |

## Incident Response Phases (Checklist)

### 1. Preparation (done before incident)
- [ ] This document exists and is known to key people
- [ ] Important contacts list is up-to-date
- [ ] Logging/monitoring is enabled (winston + GitHub workflow)
- [ ] Backups exist and are tested
- [ ] Access to hosting, database, domain registrar, GitHub is documented

### 2. Identification (0–30 min)
- [ ] Who/what/when first noticed the issue?
- [ ] Confirm it is really a security incident (not just bug/performance)
- [ ] Assign severity level (1–4)
- [ ] Create incident ticket/issue: `INCIDENT-YYYYMMDD-HHMM`
- [ ] Notify Incident Commander

### 3. Containment (short-term + long-term)
**Short-term (minutes–hours):**
- [ ] Disable compromised accounts/keys/tokens
- [ ] Block malicious IP(s) (cloud firewall / .htaccess / nginx)
- [ ] Put application in maintenance mode if necessary
- [ ] Change all passwords + rotate API keys/secrets

**Long-term:**
- [ ] Patch/deploy fixed version
- [ ] Revoke & rotate ALL potentially exposed secrets

### 4. Eradication
- [ ] Remove backdoors, webshells, malicious code
- [ ] Check for persistence (cron jobs, new users, modified files)
- [ ] Re-image/re-deploy server/container if heavily compromised

### 5. Recovery
- [ ] Restore from clean backup (verify integrity!)
- [ ] Gradually bring services back online
- [ ] Increase monitoring/watch for re-compromise (first 7–14 days critical)

### 6. Post-Incident / Lessons Learned (within 1 week)
- [ ] Write incident report (what happened, timeline, root cause)
- [ ] What went well / what went poorly
- [ ] Update this document
- [ ] Implement preventive measures
- [ ] If data breach → decide on notifications (customers, authorities)

## Quick Emergency Contacts

- Hosting provider emergency: ___________________________
- Domain registrar: ____________________________________
- GitHub account recovery: support.github.com
- Security consultant/company (if you have one): _________
- National CERT / Data Protection Authority: ____________

## Useful Commands / Links (Node.js + common hosts)

```bash
# Check latest changes on server
git log -n 20 --oneline

# Find recently modified files
find /var/www -type f -mtime -7

# Check listening ports
netstat -tulnp    # or   ss -tulnp

# Last logged in users
last

# Suspicious processes
ps aux --sort=-%cpu | head -30
