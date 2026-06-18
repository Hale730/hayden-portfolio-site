# Millfield County Project Audit

Audit generated: 2026-05-24

## Executive Summary

This project is a static, multi-page narrative website for the fictional Millfield County. It presents itself as an early-2000s county government website, but it also contains several hidden or semi-hidden story layers: a staff-only intranet, restricted records, a Tony's Pizza microsite with a touch-tone phone mechanic, a records trail about missing/unverified students, a later Tony Sicero disappearance update, and a CRT television simulation.

The project has no build step, no package manifest, no server-side code, and no framework. It is meant to run as static files in a browser. JavaScript provides dynamic behavior through DOM manipulation, `localStorage`, `sessionStorage`, audio/video playback, and client-side routing by changing `window.location`.

The important story systems are:

- The public Millfield County site, styled like a small county website from 2002.
- A public news layer that looks ordinary at first but changes after calling Tony's Pizza.
- The Records Office archive, including a client-side restricted sign-in system.
- Daniel Harper's admin/intranet portal, which exposes staff mail and record credentials.
- Tony's Pizza, whose fake phone ordering popup can call county/staff numbers and set the Tony disappearance state.
- A CRT TV simulation with draggable channel dial, power switch, static, ads, and a Millfield PSA.
- A personal/academic PDF asset that is currently untracked in git.

## Project Shape

The repository root is:

`C:\Users\ripti\Downloads\Palimpsest_WEB`

The site is static HTML/CSS/JavaScript. There is no `package.json`, no bundler, no framework config, and no backend language. All pages use relative links and assets.

Top-level content groups:

- Root public pages: county home, news, departments, staff, contact, calendar, records, admin login/dashboard, and Tony's Pizza.
- `articles/`: county news articles and a fake archive 404 page.
- `profiles/`: staff profile pages.
- `styles/`: public county, restricted-records, and Tony's Pizza CSS.
- `scripts/`: public county, restricted-records, and Tony's Pizza JavaScript.
- `assets/`: images, portraits, records, Palimpsest images, Tony's Pizza images, cursors, and one PDF.
- `audio/`: key tones, dial-up, county/staff/Tony voicemail audio, and cursor sound.
- `tv/`: a self-contained CRT television mini-app with its own HTML, CSS, JS, images, videos, audio, and font files.

Git status at audit time showed one untracked file:

- `assets/University_of_Texas_Academic_Summary.pdf`

## Public County Site

The county site centers on `index.html` and shared styling in `styles/millfield.css`.

Shared visual identity:

- Early-2000s government web aesthetic.
- Verdana/Arial/Tahoma typography.
- Fixed 860px `.site-shell`.
- `zoom: 1.5` on normal county pages and `zoom: 1.15` on the calendar page.
- Blue beveled headers and module panels.
- Tan/gray page background using `assets/Millfield_background.png`.
- Custom cursor assets:
  - `assets/cursor.png`
  - `assets/cursor_hover.png`
- Shared footer text:
  - Millfield County Administration
  - Office Hours: Monday-Friday, 8:00 AM to 5:00 PM
  - Phone: `(555) 014-1891`
  - Email: `admin@millfieldcounty.gov`

The shared script `scripts/millfield.js` runs on DOM ready and initializes:

- `ensureCalendarNavLink()`
- `initNewsCarousel()`
- `initNewsArchive()`
- `initFooterMeta()`

### Footer Metadata Injection

`scripts/millfield.js` appends a `.footer-era-meta` block to every `.site-footer` if one is not already present.

Injected text:

- Official Site of Millfield County
- Last Updated: `4/16/2002`
- County Information Office
- Webmaster: `admin@millfieldcounty.gov`
- Staff Login link

The Staff Login href is path-sensitive:

- Root pages link to `admin-login.html`.
- Article/profile pages link to `../admin-login.html`.

### Calendar Nav Injection

Some article/profile nav bars do not hard-code a Calendar item. `ensureCalendarNavLink()` adds one after the News link when absent.

Path-sensitive Calendar href:

- Root pages: `calendar.html`
- Article/profile pages: `../calendar.html`

If the current path ends in `/calendar.html`, the Calendar link receives `active`.

## Public Routes

### `index.html`

Purpose: public homepage.

Main sections:

- Welcome panel with county intro.
- Quick links to Departments and News.
- Latest News carousel with six slides:
  - Middle School schedule update.
  - Tony's Pizza opening.
  - Local student indie game.
  - Community town hall.
  - Elementary spring art showcase.
  - Password habits article.

Carousel behavior from `scripts/millfield.js`:

- Uses `[data-news-carousel]`.
- Previous/next buttons.
- Dot navigation.
- Auto-advances every 5500 ms.
- Pauses on hover and focus.
- Pauses while document is hidden.
- Applies `aria-hidden` to inactive slides.

Tony-specific homepage mutation:

- If `localStorage.tonysCalled === "true"`, the Tony's Pizza slide is moved to the front.
- Its image changes to `assets/tony/Tony_Family.png`.
- Its title becomes `The Search For Tony Sicero Continues`.
- Its link becomes `articles/owner-of-recently-opened-restaurant-unreachable.html`.
- Its copy says the search for Tony continued into Tuesday after he was reported missing.

### `departments.html`

Purpose: public department directory.

Departments listed:

- County Clerk.
- Public Works.
- Sheriff's Office.
- Health Services.
- Parks & Recreation.
- Records Office.

The Records Office card links to `records-office.html`.

### `news.html`

Purpose: public news archive.

News cards listed from April 16, 2002 back through April 2, 2002. Several entries intentionally link to `articles/sorry-404.html`.

Real article links:

- `articles/middle-school-schedule.html`
- `articles/tonys-pizza-opening.html`
- `articles/local-student-makes-indie-game.html`
- `articles/community-meeting-draws-residents-to-town-hall.html`
- `articles/millfield-elementary-students-prepare-spring-art-showcase.html`
- `articles/county-officials-encourage-stronger-password-habits.html`

Tony-specific news mutation:

- If `localStorage.tonysCalled === "true"`, the Tony's Pizza news card is moved to the top.
- Its date becomes `May 14, 2002`.
- Its link/title become `The Search For Tony Sicero Continues`.
- Its summary changes to the Tony disappearance copy.

### `calendar.html` and `calendar.js`

Purpose: interactive weekly county calendar for 2002.

Calendar rendering facts:

- Year locked to `2002`.
- Initial week starts April 7, 2002.
- Day window runs from 7:00 AM to 8:00 PM.
- Time labels every 60 minutes.
- Weekly navigation with Previous Week and Next Week buttons.
- Minimum week starts at the week containing January 1, 2002.
- Maximum week starts at the week containing December 31, 2002.
- Event hover/focus shows a fixed-position popup.
- Events are grouped by date and sorted with all-day events first, then timed events.
- Timed events are laid out into lanes when overlapping.

Event categories:

- Office Closure
- School Event
- County Event
- Public Program
- Community Event
- Staff Birthday

Notable story-relevant calendar entries:

- March 18, 2002: Millfield Middle School Parent Night.
- April 7, 2002: National Library Week Kickoff.
- April 8, 2002: Tony's Pizza Ribbon Cutting.
- April 8, 2002: Community Meeting at Town Hall.
- April 10, 2002: Millfield Elementary Spring Art Showcase.
- April 15, 2002: Millfield Middle School Reopens.
- April 18, 2002: County Records Review Day.
- April 22, 2002: Public Access Archive Review Meeting.
- May 12, 2002: Mothers Day Community Breakfast.
- May 24, 2002: County Offices Close Early.

### `staff.html`

Purpose: public staff directory.

Public staff cards:

| Name | Public Title | Profile |
| --- | --- | --- |
| Margaret Voss | County Administrator | `profiles/margaret-voss.html` |
| Thomas Weller | Deputy Administrator | `profiles/thomas-weller.html` |
| Janice Bell | Records Office Supervisor | `profiles/janice-bell.html` |
| Mark Ellison | Public Information Coordinator | `profiles/mark-ellison.html` |
| Elaine Mercer | District Liaison | `profiles/elaine-mercer.html` |
| Patricia Boone | Community Outreach Director | `profiles/patricia-boone.html` |
| Emily Cross | Staff Writer | `profiles/emily-cross.html` |
| Daniel Harper | Staff Reporter | `profiles/daniel-harper.html` |

Profile details:

| Staffer | Email | Phone | Public Bio Focus |
| --- | --- | --- | --- |
| Margaret Voss | `mvoss@millfieldcounty.gov` | `(555) 014-2101` | Administration, planning, policy, budget, departments. |
| Thomas Weller | `tweller@millfieldcounty.gov` | `(555) 014-2104` | Operations planning, meeting coordination, scheduling. |
| Janice Bell | `jbell@millfieldcounty.gov` | `(555) 014-2122` | Records intake, archive retrieval, indexing standards. |
| Mark Ellison | `mellison@millfieldcounty.gov` | `(555) 014-2116` | News releases, service advisories, meeting notices. |
| Elaine Mercer | `emercer@millfieldcounty.gov` | `(555) 014-2135` | School/district coordination and parent-facing updates. |
| Patricia Boone | `pboone@millfieldcounty.gov` | `(555) 014-2147` | Community events, outreach, volunteer partnerships. |
| Emily Cross | `ecross@millfieldcounty.gov` | `(555) 014-2213` | Business openings, arts/culture, community features. |
| Daniel Harper | `dharper@millfieldcounty.gov` | `(555) 014-2219` | School operations, public safety, high-priority civic stories. |

Audit note: the public titles do not always match the admin intranet titles. This may be intentional narrative mismatch or ordinary internal/public role naming drift.

### `contact.html`

Purpose: contact card page.

Contact details:

- Millfield County Administration Center.
- 125 Courthouse Square.
- Millfield, MA 01891.
- Phone: `(555) 014-1891`.
- Email: `admin@millfieldcounty.gov`.

Audit note: Tony's Pizza says Millfield, IL, while the county contact page says Millfield, MA. That is either a story clue, placeholder inconsistency, or continuity issue.

## News Articles

### `articles/middle-school-schedule.html`

Title: `Millfield Middle School Resumes Normal Schedule Monday`

Byline/date:

- By Daniel Harper.
- Thursday April 11th, 2002 - 12:52 PM.

Image:

- `assets/Millfield_School.png`

Key content:

- Middle School resumes normal schedule after temporary closure and a three-week observation period.
- Students should enter through east doors.
- Parents are asked not to approach the west hallway during arrival or dismissal.
- District messaging is carefully limited and avoids explaining what happened.

### `articles/tonys-pizza-opening.html`

Title: `Tony's Pizza Opens on Briar Hollow Road`

Byline/date:

- By Emily Cross.
- April 10, 2002 - 9:42 AM.

Image:

- `assets/tony/Grand opening at Tony's Pizza.png`

Key content:

- Tony Sicero opens Tony's Pizza at 184 Briar Hollow Rd.
- Quote from Tony: he is glad the town came out after everything happening.
- Links to `../tonys-pizza.html`.
- Establishes Tony, the restaurant, the address, and the online ordering system.

### `articles/local-student-makes-indie-game.html`

Title: `Local Student Develops Indie Game Inspired by Millfield`

Byline/date:

- By Emily Cross.
- April 9, 2002 - 3:27 PM.

Image:

- `assets/Palimpsest/Header Capsule.png`

Key content:

- Nolan Richards, a Millfield High senior, is developing a narrative game called `Palimpsest`.
- The game is described as layered, quiet, atmospheric, and based loosely on Millfield.
- External Steam link: `https://store.steampowered.com/app/4597020/Palimpsest/`

### `articles/community-meeting-draws-residents-to-town-hall.html`

Title: `Community Meeting Draws Residents to Town Hall`

Byline/date:

- By Daniel Harper.
- April 8, 2002 - 7:14 PM.

Image:

- `assets/Townhall.png`

Key content:

- Residents ask about recent schedule changes and Middle School closure.
- Margaret Voss says the county will keep people informed.
- Officials confirm classes will resume but do not provide details.
- County offices are operating on modified schedules during internal reviews.

### `articles/millfield-elementary-students-prepare-spring-art-showcase.html`

Title: `Millfield Elementary Students Prepare Spring Art Showcase`

Byline/date:

- By Emily Cross.
- April 6, 2002 - 2:18 PM.

Image:

- `assets/SpringArt.png`

Key content:

- Ordinary community filler article.
- Showcase runs 5:30 PM to 7:00 PM.
- Uses a teacher quote from Melissa Grant.

### `articles/county-officials-encourage-stronger-password-habits.html`

Title: `County Officials Encourage Stronger Password Habits as Services Move Online`

Byline/date:

- By Emily Cross.
- April 5, 2002 - 11:42 AM.

Image:

- `assets/BestPasswords.jpg`

Key content:

- Explains password safety through Alan Brooks quotes.
- Warns against short, predictable, identity-based passwords.
- Daniel Harper admits he uses his last name and birthday as a password format.
- This is a clue for the admin login:
  - Admin username: `dharper@millfieldcounty.gov`
  - Admin password: `harper0824`
- August 24 is also Daniel Harper's birthday in the county calendar.

### `articles/owner-of-recently-opened-restaurant-unreachable.html`

Title: `The Search For Tony Sicero Continues`

Byline/date:

- By Daniel Harper.
- Tuesday, May 14th, 2002 - 11:23 AM.

Images:

- `assets/tony/Tony_Family.png`
- `assets/tony/Tony_CCV.png`

Key content:

- Tony Sicero was reported missing.
- Last seen in early morning hours of Sunday, May 12.
- A man matching him was observed near Millfield Middle School at approximately 4:23 AM.
- Authorities ask for information at `(555) 014-1901`.
- Security still appears to show a matching man in a parking lot.
- Tony's Pizza has remained closed with lights off during normal business hours.

Visibility mechanic:

- This article exists as a file but becomes promoted in the homepage carousel and news archive only after the Tony's Pizza phone mechanic sets `localStorage.tonysCalled = "true"`.

### `articles/sorry-404.html`

Purpose:

- Fake archive 404 for unavailable news/records.

Text:

- Requested article is unavailable.
- May be pending publication or retained for internal reference.

## Records Office System

The Records Office starts from `records-office.html` and continues through `records-office-page2.html`, `records-office-page3.html`, and `records-office-page4.html`.

The index is public, but restricted records require client-side sign-in.

### Shared Records Index Behavior

Each records index page repeats inline CSS for:

- `.records-note`
- `.records-page-label`
- `.records-access-note`
- `.records-table`
- `.record-status-*`
- `.record-access`
- `.records-pagination`

Each page repeats the same Records Office explanatory copy:

- Public index of archived county record groups.
- Records Desk: `records@millfieldcounty.gov`.
- Request Window: Monday-Friday, 9:00 AM to 3:30 PM.
- Filing dates are archive copy filing dates.
- Restricted entries require sign-in.

### Records Index Page 1: `records-office.html`

Record group: 1976-1983.

| ID | Title | Department | Filed | Status | Access | Last Reviewed |
| --- | --- | --- | --- | --- | --- | --- |
| RG-76-001 | 1976 Budget Report | Finance | Dec 21, 1976 | Archived | Public Copy | March 2002 |
| RG-77-014 | 1977 School Zoning Plan | Planning & Zoning | Aug 9, 1977 | Archived | Public Copy | February 2002 |
| RG-78-033 | 1978 Student Transportation Route Amendments | Transportation | Sep 18, 1978 | Review Hold | Redacted Copy | February 2002 |
| RG-79-008 | 1979 School Facilities Maintenance Board Minutes | School Administration | Nov 2, 1979 | Withheld | Internal Summary | Pending |
| RG-80-019 | 1980 Water Utility Corridor Survey | County Operations | Jun 27, 1980 | Review Hold | On-Site Review | January 2002 |
| RG-81-006 | 1981 Public Health Immunization Clinic Ledger | Public Health | Apr 14, 1981 | Withheld | Redacted Copy | Pending |
| RG-82-021 | 1982 Records Retention Inventory Workbook | Records Office | Jan 25, 1982 | Withheld | Request Required | Pending |
| RG-83-017 | 1983 Zoning Variance Hearing Register | Planning & Zoning | Oct 6, 1983 | Archived | Public Copy | April 2002 |

### Records Index Page 2: `records-office-page2.html`

Record group: 1984-1990.

| ID | Title | Department | Filed | Status | Access | Last Reviewed |
| --- | --- | --- | --- | --- | --- | --- |
| RG-84-004 | 1984 Facilities Summary | Facilities | Nov 27, 1984 | Archived | Public Copy | March 2002 |
| RG-85-012 | 1985 Transportation Review | Transportation | Oct 14, 1985 | Archived | Public Copy | March 2002 |
| RG-86-003 | 1986 Parks Expansion Parcel Log | Parks & Recreation | May 8, 1986 | Review Hold | On-Site Review | February 2002 |
| RG-87-009 | 1987 Emergency Radio Tower Service Audit | County Operations | Sep 22, 1987 | Withheld | Internal Summary | Pending |
| RG-88-022 | 1988 Floodplain Parcel Review | Planning & Zoning | Dec 1, 1988 | Review Hold | Redacted Copy | November 2001 |
| RG-89-015 | 1989 Community Program Grant Disbursement Register | Administration | Jul 19, 1989 | Withheld | Request Required | Pending |
| RG-90-005 | 1990 Bridge Safety Inspection File | Public Works | Mar 2, 1990 | Review Hold | On-Site Review | January 2002 |
| RG-90-028 | 1990 Waterline Maintenance Log | Utilities | Oct 30, 1990 | Withheld | Internal Summary | Pending |

### Records Index Page 3: `records-office-page3.html`

Record group: 1991-1998.

| ID | Title | Department | Filed | Status | Access | Last Reviewed |
| --- | --- | --- | --- | --- | --- | --- |
| RG-91-011 | 1991 Annex Heating Replacement Bid | Facilities | Feb 13, 1991 | Withheld | Request Required | Pending |
| RG-92-019 | 1992 Court Filing Migration Index | County Clerk | Aug 5, 1992 | Review Hold | Internal Summary | December 2001 |
| RG-93-007 | 1993 Fleet Vehicle Retirement Roster | County Operations | Mar 29, 1993 | Withheld | Internal Summary | Pending |
| RG-94-013 | 1994 Courthouse Access Badge Audit | Administration | Oct 17, 1994 | Review Hold | Redacted Copy | February 2002 |
| RG-95-006 | 1995 Public Health Outreach Grant Notes | Public Health | Jun 8, 1995 | Withheld | Redacted Copy | Pending |
| RG-96-004 | 1996 Building Access Request Register | Facilities | Jan 23, 1996 | Review Hold | On-Site Review | January 2002 |
| RG-97-016 | 1997 Service Desk Incident Summary | Information Office | Sep 3, 1997 | Withheld | Internal Summary | Pending |
| RG-98-003 | 1998 Security Camera Procurement File | Procurement | Nov 16, 1998 | Withheld | Request Required | Pending |

### Records Index Page 4: `records-office-page4.html`

Record group: 1999-2002.

| ID | Title | Department | Filed | Status | Access | Last Reviewed |
| --- | --- | --- | --- | --- | --- | --- |
| RG-99-002 | 1999 Archive Digitization Pilot Memo | Records Office | Jan 12, 1999 | Review Hold | Internal Summary | January 2002 |
| RG-99-018 | 1999 Facilities Access Card Replacement Plan | Facilities | Oct 28, 1999 | Restricted | Authorized Sign-In | March 2002 |
| RG-00-006 | 2000 Election Filing Storage Log | County Clerk | Feb 21, 2000 | Review Hold | Redacted Copy | December 2001 |
| RG-00-021 | 2000 Public Works Salt Inventory Ledger | Public Works | Dec 14, 2000 | Withheld | Internal Summary | Pending |
| RG-01-005 | 2001 Public Access Broadcast Conversion Plan | Information Office | Mar 9, 2001 | Withheld | Internal Summary | Pending |
| RG-01-014 | 2001 Corridor Lighting Retrofit Estimate | Facilities | Sep 27, 2001 | Review Hold | On-Site Review | February 2002 |
| RG-02-003 | 2002 Q1 Internal Work Order Ledger | Administration | Mar 4, 2002 | Withheld | Internal Summary | Pending |
| RG-02-006 | March 2002 Traffic Post Assignment Notes | Sheriff's Department | Mar 21, 2002 | Restricted | Authorized Sign-In | April 2002 |
| RG-02-009 | 2002 Visitor Screening Procedure Draft | Administrative Security Office | Apr 2, 2002 | Review Hold | Authorized Sign-In | April 2002 |
| RG-02-011 | Student Pickup Area Incident Report | Millfield County Police Department | Mar 19, 2002 | Restricted | Authorized Sign-In | April 2002 |

## Public Record Detail Pages

### `record-1976-budget-report.html`

ID: RG-76-001.

Summary:

- Finance annual budget archive.
- Filed December 21, 1976.
- Released public copy.
- Covers adopted operating budget, departmental allocations, capital requests, reserve planning, staffing appropriations, fleet replacement, records storage, and emergency contingency funds.

Related:

- RG-77-014.
- Fake unavailable RG-76-009.

### `record-1977-school-zoning.html`

ID: RG-77-014.

Summary:

- Planning & Zoning school district map revision.
- Filed August 9, 1977.
- Released public copy.
- Covers school zoning boundary adjustments, map references, planning notes, and board approval language.

Related:

- RG-76-001.
- Fake unavailable RG-78-033.

### `record-1984-facilities-summary.html`

ID: RG-84-004.

Summary:

- Facilities annual site condition summary.
- Filed November 27, 1984.
- Covers county buildings, schools, administration offices, maintenance storage, roof condition, heating equipment, elevator intervals, and deferred maintenance.

Related:

- RG-85-012.
- Fake unavailable RG-86-003.

### `record-1985-transportation-review.html`

ID: RG-85-012.

Summary:

- Transportation network performance review.
- Filed October 14, 1985.
- Covers route mileage totals, resurfacing priorities, fleet usage, and bridge inspection scheduling.

Related:

- RG-84-004.
- Fake unavailable RG-90-005.

## Restricted Records

Restricted-record styling is in `styles/restricted-records.css`.

Restricted-record logic is in `scripts/restricted-records.js`.

### Restricted Login Page

File: `records-restricted-access.html`

Purpose:

- Sign-in screen for restricted archive files.
- Uses form `[data-restricted-login-form]`.
- Shows a status message if a `?return=` target is present.
- On success, redirects to the validated return target or `records-office-page4.html`.

Displayed warning:

- Authorized Personnel Only.
- Restricted files may be limited due to active review, privacy restrictions, or administrative controls.

### Restricted Credentials

The visible restricted-record credentials are disclosed inside Daniel Harper's admin mail.

Credentials:

- Username: `dharper_io`
- Password: `Record$_0103!`

Script verification:

- `USERNAME_HASH = "1480129405"`
- `CREDENTIAL_HASH = "2650070322"`
- Hash function is a simple client-side 31x string hash using `Math.imul`.
- Verified pair: `createAuthSignature("dharper_io") === "1480129405"`.
- Verified pair: `createAuthSignature("dharper_io|Record$_0103!") === "2650070322"`.

Storage:

- Login success stores `localStorage["millfieldRestrictedRecordsAuth"] = "2650070322"`.
- Per-record path access uses `sessionStorage` keys prefixed with `millfieldRestrictedPath:`.

Security note:

- This is not real authentication. Anyone can inspect the code, set local/session storage, or reuse the discovered credentials.

### Restricted Guard Logic

Any page with `data-restricted-protected` triggers the guard.

Guard sequence:

1. If no restricted session exists, redirect to `records-restricted-access.html?return=<current-file>`.
2. If the page declares required path IDs and the user lacks them, redirect to its fallback page.
3. If access succeeds, apply all granted path IDs to `sessionStorage`.

Return target validation rejects:

- Empty values.
- Absolute URLs containing `://`.
- Root-relative paths.
- Paths containing `..`.
- Non-HTML targets.

### Restricted Pages and Access Chain

| Page | Page ID | Requires | Grants | Fallback |
| --- | --- | --- | --- | --- |
| `record-1999-facilities-access-card-replacement-plan.html` | none | login only | none | default |
| `record-2002-traffic-post-assignment-notes.html` | none | login only | none | default |
| `record-2002-visitor-screening-procedure-draft.html` | none | login only | none | default |
| `record-2002-student-pickup-area-incident-report.html` | `rg-02-011` | login only | `rg-02-011` | default |
| `record-2002-april-28-police-report.html` | `pd-02-041` | `rg-02-011` | `pd-02-041-a`, `pd-02-041-b`, `pd-02-041-c`, `pd-02-041-d`, plus page ID | student pickup report |
| `record-2002-whitlock-family-statement.html` | `pd-02-041-a` | any listed case/statement ID | all case/statement IDs plus `pd-02-041-a-int` | April 28 report |
| `record-2002-ramirez-family-statement.html` | `pd-02-041-b` | any listed case/statement ID | all case/statement IDs | April 28 report |
| `record-2002-keller-family-statement.html` | `pd-02-041-c` | any listed case/statement ID | all case/statement IDs | April 28 report |
| `record-2002-bell-family-statement.html` | `pd-02-041-d` | any listed case/statement ID | all case/statement IDs | April 28 report |
| `record-2002-karen-whitlock-interview.html` | `pd-02-041-a-int` | `pd-02-041-a-int` | page ID only | Whitlock statement |

The intended progression is:

1. Find admin login through the footer.
2. Infer Daniel Harper's admin credentials from the password article and birthday.
3. Read Daniel's mail for restricted records credentials.
4. Sign in to restricted records.
5. Open RG-02-011.
6. Open PD-02-041 from RG-02-011.
7. Open family statements from PD-02-041.
8. Open the Karen Whitlock interview after visiting the Whitlock statement.

## Restricted Record Story Content

### `record-1999-facilities-access-card-replacement-plan.html`

ID: RG-99-018.

Summary:

- Facilities access-card replacement planning file.
- Filed October 28, 1999.
- Mentions discontinued access cards for Records Office storage, west hallway maintenance closets, and lower file annex.
- Notes repeated card read errors and inconsistent badge numbering after spring 1999 transfer cycle.

### `record-2002-traffic-post-assignment-notes.html`

ID: RG-02-006.

Summary:

- Sheriff's Department coordination notes.
- Filed March 21, 2002.
- Covers temporary traffic post placement during school arrival/release routing.
- Mentions east loop lane control, pedestrian crossover coverage, and handoff timing.
- Additional post assigned to east entry during the morning window for two days.

Related:

- RG-02-011 Student Pickup Area Incident Report.
- RG-02-009 Visitor Screening Procedure Draft.

### `record-2002-visitor-screening-procedure-draft.html`

ID: RG-02-009.

Summary:

- Administrative Security Office procedure draft.
- Filed April 2, 2002.
- Covers front desk sign-in, temporary badges, escort responsibility, visitor return routing, after-hours vendor access, and unannounced visitor routing through the main desk.

Related:

- RG-02-006.
- RG-02-011.

### `record-2002-student-pickup-area-incident-report.html`

ID: RG-02-011.

Summary:

- Millfield County Police Department incident report.
- Filed March 19, 2002.
- Incident date March 18, 2002.
- Displays image `assets/Records/March 19th Police Report.png`.
- Has related link to PD-02-041 April 28 Police Report.

This page is the parent restricted record needed before the April 28 police report can be accessed.

### `record-2002-april-28-police-report.html`

Case ID: PD-02-041.

Summary:

- April 28, 2002 incident at Millfield Middle School student pickup area.
- Time window: 3:15 PM - 3:40 PM.
- Filed April 29, 2002.
- Reporting officer: Dep. S. Alvarez.
- Incident type: Reported Missing Students.
- Classification: Non-Criminal Incident Report.

Reported guardians:

- Karen Whitlock.
- Luis Ramirez.
- Diane Keller.
- Marcus Bell.

Associated students listed as unverified:

- Emily Whitlock, 7th Grade.
- Mateo Ramirez, 6th Grade.
- Jordan Keller, 8th Grade.
- Aaliyah Bell, 7th Grade.

Incident logic:

- Multiple guardians say students did not exit during dismissal.
- School checks enrollment, attendance, classroom rosters, archived records, locker assignments, and belongings.
- No matching student records are found.
- Teachers named by guardians say they do not know the students.
- No evidence of forced entry, abduction, or criminal activity is observed.
- No missing persons investigation is initiated.
- Case is closed as an unverified report.

### Family Statements

`record-2002-whitlock-family-statement.html`

- Statement ID: PD-02-041-A.
- Reporting party: Karen Whitlock, age 39, Dental Hygienist.
- Secondary guardian: Daniel Whitlock, Insurance Adjuster.
- Student: Emily Whitlock, age 12, 7th grade, homeroom Mrs. Givens.
- Karen says Emily attended all year and references a parent-teacher conference.
- Grants access to Karen's interview recording.

`record-2002-ramirez-family-statement.html`

- Statement ID: PD-02-041-B.
- Reporting party: Luis Ramirez, age 42, Auto Technician.
- Student: Mateo Ramirez, age 11, 6th grade, homeroom Mr. Daley.
- Luis says he dropped Mateo off around 8:12 AM.
- Says he contacted the office earlier in the week about attendance.

`record-2002-keller-family-statement.html`

- Statement ID: PD-02-041-C.
- Reporting party: Diane Keller, age 45, Real Estate Agent.
- Secondary guardian: Thomas Keller, listed at separate address.
- Student: Jordan Keller, age 13, 8th grade.
- Reported activity: Track Team.
- Diane references Coach Hensley and a school activity schedule.

`record-2002-bell-family-statement.html`

- Statement ID: PD-02-041-D.
- Reporting party: Marcus Bell, age 38, Delivery Driver.
- Secondary guardian: Rochelle Bell, Nurse.
- Student: Aaliyah Bell, age 12, 7th grade, homeroom Ms. Turner.
- Marcus says documentation exists but was not available at time of report.
- References coursework and daily attendance.

### `record-2002-karen-whitlock-interview.html`

Attachment ID: PD-02-041-A-INT.

Media:

- `assets/Records/Karen_Interview.mp3`

Transcript facts:

- Interview date: April 28, 2002.
- Location: Millfield Middle School - Administrative Office.
- Participants: Sheriff Hale and Karen Whitlock.
- Karen states her missing daughter is Emily Whitlock.
- Sheriff says school staff found no enrollment, attendance, or classroom record.
- Karen says Emily has a locker, classes, and homework at home.
- Sheriff says they are unable to verify the existence of a student by that name in school/district records.
- Karen asks, "then where is she?"
- Karen concludes, "You're telling me my daughter doesn't exist."

## Admin Portal

Admin files:

- `admin-login.html`
- `admin-dashboard.html`
- `admin.css`
- `admin.js`

### Admin Login

Credentials are hard-coded in `admin.js`:

- Username: `dharper@millfieldcounty.gov`
- Password: `harper0824`

The login form is purely client-side. On success it redirects to `admin-dashboard.html`. It does not set a session token, and `admin-dashboard.html` is directly accessible if the file path is known.

The password clue comes from:

- The password article, where Daniel says he uses his last name and birthday.
- Calendar entry: Daniel Harper Birthday on August 24, 2002.

### Admin Dashboard Identity

Header:

- Millfield County Intranet.
- User: Daniel Harper.
- Department: Information Office.
- Last Login: April 14, 2002 - 8:14 AM.

Sections:

- Mail.
- Internal Notices.
- Staff Directory.
- Records Archive.
- Forms & Requests.
- Work Orders.
- Policies.
- Office Calendar.

### Admin Mail

Folders:

- Inbox.
- Sent.
- Spam.
- All Mail.

Inbox messages:

| ID | Date | From | Subject | Story Use |
| --- | --- | --- | --- | --- |
| `in-voss-routing` | Apr 11, 2002 10:46 AM | Margaret Voss | Re: Middle School Coverage Language | Shows Daniel objected to sanitized school coverage; Margaret orders publication and says not to revisit. |
| `in-records-portal-access` | Mar 26, 2002 3:44 PM | Records Desk | Re: Records Portal Access | Provides restricted records credentials: `dharper_io` / `Record$_0103!`. |
| `in-janice-delay` | Apr 15, 2002 8:11 AM | Janice Bell | Archive Index Delay - 1978 to 1983 | Says 1978-1983 records remain unavailable until Room B review closes. |
| `in-david-maintenance` | Apr 15, 2002 7:02 AM | David Mercer | Print Queue Maintenance Tonight | Routine IT notice. |
| `in-elaine-hours` | Apr 14, 2002 2:18 PM | Elaine Mercer | Front Desk Hours Adjustment (Friday) | Desk coverage begins 8:30 AM Friday. |
| `in-patricia-visitor` | Apr 14, 2002 5:39 PM | Patricia Boone | Visitor Check-In Reminder | Visitors still entering through side hallway first. |
| `in-mark-review` | Apr 12, 2002 11:50 AM | Mark Ellison | Re: Transportation Review Posting | Hold publication language until accounting confirms totals. |

Sent messages:

| ID | Date | To | Subject |
| --- | --- | --- | --- |
| `sent-margaret-draft` | Apr 15, 2002 8:57 AM | Margaret Voss | Draft Response for Channel 8 Inquiry |
| `sent-janice-status` | Apr 14, 2002 8:04 AM | Janice Bell | 1981 File Request Status Check |
| `sent-emily-directory` | Apr 13, 2002 5:11 PM | Emily Cross | Updated Contact Sheet Received |
| `sent-david-lock` | Apr 13, 2002 1:22 PM | David Mercer | WO-2047 Lock Replacement Follow-Up |
| `sent-mark-language` | Apr 12, 2002 10:58 AM | Mark Ellison | Records Line for Transportation Summary |

Spam messages:

| ID | Date | Sender | Subject |
| --- | --- | --- | --- |
| `spam-toner` | Apr 15, 2002 5:33 AM | National Toner Program | Toner Contract Expiring Today |
| `spam-furniture` | Apr 14, 2002 4:18 AM | Municipal Deals Weekly | Government Office Furniture Liquidation |
| `spam-fax` | Apr 13, 2002 2:55 AM | Office Service Alerts | Fax Ribbon Supply Alert |
| `spam-newsletter` | Apr 12, 2002 3:14 AM | Civic Press Marketing | Regional Newsletter Bundle Offer |
| `spam-payroll` | Apr 11, 2002 11:49 PM | Payroll Access Center | Employee Payroll Advance Program |

### Admin Internal Notices

| ID | Title | Department | Posted | Summary |
| --- | --- | --- | --- | --- |
| `notice-room-b` | Temporary Access Restriction - Records Room B | Records Office | Apr 15, 2002 8:00 AM | Room B limited to assigned records staff. |
| `notice-media` | Media Inquiry Routing Reminder | Information Office | Apr 15, 2002 7:42 AM | External calls must be logged before transfer. |
| `notice-hours` | Front Desk Opening Adjustment - Friday 4/19 | Administration | Apr 14, 2002 5:05 PM | Front desk opens at 8:30 AM. |
| `notice-delay` | Archive Request Timing Update | Records Office | Apr 14, 2002 2:22 PM | 1978-1983 holdings need more processing. |
| `notice-visitor` | Visitor Guidance for Main Entrance | Public Services | Apr 13, 2002 4:44 PM | Visitors must report to Admin 101 before side hallways. |
| `notice-downtime` | Printer/Network Downtime Window | IT Operations | Apr 13, 2002 9:12 AM | Print queue restart from 7:15 PM to 7:45 PM. |

### Admin Staff Directory

| Name | Internal Title | Department | Ext | Office | Status |
| --- | --- | --- | --- | --- | --- |
| Margaret Voss | Director, Information Office | Information Office | 2201 | Admin 204 | Available |
| Thomas Weller | Deputy Clerk | Administration | 2210 | Admin 118 | Available |
| Janice Bell | Records Supervisor | Records Office | 2314 | Records 12 | Unavailable |
| Mark Ellison | Operations Coordinator | County Operations | 2245 | Admin 307 | In Field |
| Elaine Mercer | Front Desk Supervisor | Public Services | 2100 | Admin 101 | Available |
| Patricia Boone | Office Services Clerk | Administration | 2198 | Admin 109 | Out of Office |
| Emily Cross | Information Assistant | Information Office | 2206 | Admin 206 | Available |
| Daniel Harper | Communications Coordinator | Information Office | 2208 | Admin 205 | Available |
| David Mercer | Systems Technician | IT Operations | 2331 | IT 03 | Available |

### Admin Records Archive

Internal archive list:

- 1976 Budget Report: available.
- 1977 School Zoning: available.
- 1978 Records: unavailable.
- 1979 Records: unavailable.
- 1980 Records: unavailable.
- 1981 Records: unavailable.
- 1982 Records: unavailable.
- 1983 Records: unavailable.
- 1984 Facilities Summary: available.
- 1985 Transportation Review: available.

The 1978-1983 unavailability echoes the public news notice and Janice's mail.

### Admin Forms

Forms:

- Records Access Request.
- Media Approval Form.
- Building Access Request.
- Maintenance Ticket.
- Conference Room Reservation.
- Visitor Approval Form.

### Admin Work Orders

Work orders:

- WO-2041: West Hallway Inspection, Middle School, Pending.
- WO-2047: Storage Lock Replacement, Records Office, In Progress.
- WO-2053: HVAC Review, Admin Building, Completed.
- WO-2061: Lighting Check, Elementary Hallway, Scheduled.

### Admin Policies

Policies:

- Employee Password Guidance.
- Archive Handling Procedures.
- Media Communication Policy.
- Visitor Access Guidelines.
- Internal Directory Use Policy.

### Admin Office Calendar

Upcoming internal items:

- Apr 16, 2002 8:30 AM: Front Desk Coverage Review, Admin 101.
- Apr 16, 2002 11:00 AM: Records Intake Coordination, Records 12.
- Apr 17, 2002 2:00 PM: Facilities Work Order Check-In, Admin 307.
- Apr 19, 2002 8:45 AM: Archive Status Routing Review, Admin 204.

## Tony's Pizza Microsite

Files:

- `tonys-pizza.html`
- `styles/tonys.css`
- `scripts/tonys.js`

Purpose:

- A separate restaurant webpage for Tony's Pizza.
- Acts as the trigger point for the Tony Sicero disappearance state.

Public content:

- Restaurant name: Tony's Pizza.
- Tagline: Family Pizza, Fresh Every Day.
- Address: 184 Briar Hollow Rd, Millfield, IL.
- Phone: `(555) 014-3270`.
- Hours:
  - Sunday-Thursday: 11:00 AM to 9:00 PM.
  - Friday-Saturday: 11:00 AM to 10:00 PM.

Menu preview:

- Sicero Supreme - $18.99.
- Briar Hollow Pepperoni - $15.49.
- Classic Cheese - $13.99.
- Cheese Slice - $3.25.
- Pepperoni Slice - $3.75.
- Breadsticks - $5.25.
- Garlic Knots - $4.95.

Images:

- `assets/tony/Tony's Logo.png`
- `assets/tony/Grand opening at Tony's Pizza.png`
- `assets/tony/Tony Menu Scan.png`
- `assets/tony/Tony's Interior.png`

### Touch-Tone Ordering Popup

Triggered by:

- `Order Now` link with `[data-open-order]`.

Popup elements:

- `#tone-overlay`
- `.tone-window`
- `#tone-drag-handle`
- `#close-order-system`
- `#order-code-display`
- digit buttons with `[data-tone-digit]`
- `#tone-dial`

Behavior:

- Window is draggable by pointer.
- Escape closes the overlay.
- Backspace deletes a digit.
- Enter dials.
- Max phone number digits: 10.
- `911` is allowed as a three-digit special case.
- Display formats 10 digits as `(555)-014-3270`.
- During dialing, display cycles through `DIALING...`, `DIALING.. `, etc. every 240 ms.
- Plays dial-up audio, then number-specific audio.

Audio paths:

- Key tones: `audio/Key Tones/Key_Tone_1.wav` through `Key_Tone_5.wav`.
- Dial-up: `audio/Key Tones/Dial_Up.wav`.
- Wrong number: `audio/Key Tones/Wrong Number.mp3`.
- Default staff voicemail: `audio/Voicemails/Not_Set_Voicemail.mp3`.

Number mapping:

| Number | Response |
| --- | --- |
| `911` | `audio/Key Tones/Millfield_911.mp3` |
| `5550141891` | `audio/Voicemails/millfield_voicemail.mp3` |
| `5550141901` | `audio/Voicemails/millfield_voicemail.mp3` |
| `5550142219` | `audio/Voicemails/Daniel_Voicemail.mp3` |
| `5550142101` | `audio/Voicemails/Margaret_Voicemail.mp3` |
| `5550142147` | `audio/Voicemails/Patricia_Voicemail.mp3` |
| `5550142135` | `audio/Voicemails/Elaine_Voicemail.mp3` |
| `5550143270` | `audio/Voicemails/Tony_Voicemail.mp3` |

Staff numbers recognized but using default staff voicemail unless specifically mapped:

- `5550142101` Margaret Voss.
- `5550142104` Thomas Weller.
- `5550142122` Janice Bell.
- `5550142116` Mark Ellison.
- `5550142135` Elaine Mercer.
- `5550142147` Patricia Boone.
- `5550142213` Emily Cross.
- `5550142219` Daniel Harper.

Tony call state:

- Dialing `5550143270` and playing Tony's voicemail calls `setTonysCalledFlag()`.
- That writes `localStorage["tonysCalled"] = "true"`.
- The county homepage and news archive then promote the Tony disappearance article.

## CRT Television Mini-App

Files:

- `tv/index.html`
- `tv/style.css`
- `tv/sketch.js`
- `tv/.gitattributes`
- `tv/font/*`
- `tv/images/*`

Purpose:

- Self-contained CRT TV interface with a power button, rotating channel dial, screen/video content, static, channel display, and channel audio.

### TV DOM Structure

`tv/index.html` includes:

- `#static-video` video element.
- `#static-canvas`, currently unused fallback.
- `#crt` image, initially `images/crt_off.png`.
- `#power-btn`, aria pressed toggle.
- `#dial-1`, visible channel dial image.
- hidden `.dial-hotspot.left` and `.dial-hotspot.right`.
- `#channel-display`, initially CH 01.

### TV Styling

`tv/style.css`:

- Centers `.tv-container` in a black viewport.
- Uses `DS-Digital` font from `tv/font/DS-DIGI.TTF` and `DS-DIGIB.TTF`.
- Overlays video behind CRT image.
- Uses responsive sizing and per-channel video CSS classes.
- Positions dial at:
  - `--dial-left: 64%`
  - `--dial-top: 41%`
  - `--dial-width: 5%`
- Shows cyan digital channel display.

### TV Runtime Behavior

`tv/sketch.js`:

- Initializes by selecting CRT, power button, static video, and dial.
- Preloads on/off CRT images.
- Creates audio objects for click, channel click, static noise, and channel audio.
- Sets `DIAL_INTERACTIVE = true`.
- Tracks rotation history in memory.
- Exposes:
  - `window.getDialRotationHistory()`
  - `window.clearDialRotationHistory()`
- Starts with `setState(true)`, so the TV turns on automatically on load.

Power behavior:

- Power click toggles `isOn`.
- On state uses `images/crt_on.png`.
- Off state uses `images/crt_off.png`.
- On state shows video and plays audio as allowed.
- Off state hides video and stops audio.

Dial behavior:

- Pointer drag changes dial rotation.
- Keyboard arrows adjust by 5 degrees.
- Rotation maps to ten 10-percent channel buckets.
- Channel display uses `CH 01` through `CH 10`; off state shows `CH 00`.

Channel mapping:

| Channel Bucket | ID | Name | Video | Audio |
| --- | --- | --- | --- | --- |
| CH 02 | `camel_ad` | Camel Ad | `images/camel_ad.mp4` | `images/camel_ad_audio.mp3` |
| CH 04 | `balloon` | Balloon Land | `images/Cartoon1mp4.mp4` | `images/Balloon_Audio.mp3` |
| CH 05 | `car` | Car Commercial | `images/car.mp4` | `images/car_audio.mp3` |
| CH 08 | `millfield` | Millfield PSA | `images/PSA_small.mp4` | `images/PSA_Audio.mp3` |
| CH 10 | `deoderant` | Deoderant Ad | `images/deoderant.mp4` | `images/deoderant_audio.mp3` |
| Other buckets | none | Static | `images/tv_static_small.mp4` | `images/tv-static-323620.wav` |

TV audit notes:

- `tv/sketch.js` references `images/Balloon_Audio.mp3`, but the actual file is `tv/images/cartoon_audio.mp3`. Channel 4 audio likely fails.
- `tv/style.css` references `images/dial.png`, but the real visible dial is `images/Dial_1.png`. This appears harmless because the image element is used.
- The TV script contains many `console.log`, `console.warn`, and `console.error` diagnostics.
- File and ID spelling uses `deoderant`, not `deodorant`.
- `tv/index.html` includes `controls` on the hidden/overlaid video element.

## Asset Inventory

### Main Images

| Path | Dimensions | Bytes | Use |
| --- | ---: | ---: | --- |
| `assets/BestPasswords.jpg` | 1200x630 | 101107 | Password habits article. |
| `assets/cursor.png` | 32x32 | 207 | Default cursor. |
| `assets/cursor_hover.png` | 32x32 | 217 | Hover cursor. |
| `assets/Millfield County Seal.png` | 1024x1024 | 1330609 | Header seal. |
| `assets/Millfield_background.png` | 1536x1024 | 3158084 | County page background. |
| `assets/Millfield_School.png` | 1535x1024 | 2433782 | Middle School article and carousel. |
| `assets/SpringArt.png` | 1536x1024 | 2548382 | Elementary art article. |
| `assets/Townhall.png` | 1536x1024 | 2498401 | Town hall article. |
| `assets/Palimpsest/Header Capsule.png` | 920x430 | 787363 | Palimpsest article and carousel. |
| `assets/Palimpsest/Library Logo.png` | 1280x720 | 312525 | Present but not referenced by core pages found in audit. |

### Portrait Images

All portrait images are 1080x1350 and used on staff directory/profile pages.

| Path | Bytes |
| --- | ---: |
| `assets/Portraits/Daniel_Portrait.png` | 1260970 |
| `assets/Portraits/Elaine_Portrait.png` | 1149753 |
| `assets/Portraits/Emily_Portrait.png` | 1109571 |
| `assets/Portraits/Janice_Portrait.png` | 1198115 |
| `assets/Portraits/Margaret_Portrait.png` | 1001880 |
| `assets/Portraits/Mark_Portrait.png` | 1051026 |
| `assets/Portraits/Patricia_Portrait.png` | 1093933 |
| `assets/Portraits/Thomas_Portrait.png` | 1211416 |

### Tony's Pizza Images

| Path | Dimensions | Bytes | Use |
| --- | ---: | ---: | --- |
| `assets/tony/Grand opening at Tony's Pizza.png` | 1536x1024 | 2727297 | Tony opening article and Tony site. |
| `assets/tony/Tony Menu Scan.png` | 1536x1024 | 2538960 | Tony menu scan. |
| `assets/tony/Tony_CCV.png` | 1536x1024 | 1930008 | Tony disappearance security still. |
| `assets/tony/Tony_Family.png` | 1536x1024 | 1880580 | Tony disappearance article and dynamic carousel. |
| `assets/tony/Tony_Family_Photo.png` | 1536x1024 | 1880580 | Duplicate-size Tony family photo asset; not directly referenced in audited pages. |
| `assets/tony/Tony's Interior.png` | 1536x1024 | 2638561 | Tony site page background. |
| `assets/tony/Tony's Logo.png` | 1024x1024 | 813690 | Tony site logo. |

### Record Assets

| Path | Dimensions/Type | Bytes | Use |
| --- | --- | ---: | --- |
| `assets/Records/March 19th Police Report.png` | 1080x1350 | 1494135 | RG-02-011 filed document image. |
| `assets/Records/Karen_Interview.mp3` | MP3 | 2292859 | Karen Whitlock interview playback. |

### Audio Assets

| Path | Bytes | Use |
| --- | ---: | --- |
| `audio/cursor_sfx.mp3` | 20736 | Present; not found referenced in audited JS. |
| `audio/Key Tones/Dial_Up.wav` | 1504872 | Tony dialer call sequence. |
| `audio/Key Tones/Key_Tone_1.wav` | 23884 | Tony keypad tone. |
| `audio/Key Tones/Key_Tone_2.wav` | 23884 | Tony keypad tone. |
| `audio/Key Tones/Key_Tone_3.wav` | 21240 | Tony keypad tone. |
| `audio/Key Tones/Key_Tone_4.wav` | 21240 | Tony keypad tone. |
| `audio/Key Tones/Key_Tone_5.wav` | 21240 | Tony keypad tone. |
| `audio/Key Tones/Millfield_911.mp3` | 42841 | 911 dialer response. |
| `audio/Key Tones/Wrong Number.mp3` | 37042 | Generic wrong-number response. |
| `audio/Voicemails/Daniel_Voicemail.mp3` | 151236 | Daniel phone response. |
| `audio/Voicemails/Elaine_Voicemail.mp3` | 137026 | Elaine phone response. |
| `audio/Voicemails/Margaret_Voicemail.mp3` | 217692 | Margaret phone response. |
| `audio/Voicemails/millfield_voicemail.mp3` | 424999 | County/admin/non-emergency phone response. |
| `audio/Voicemails/Not_Set_Voicemail.mp3` | 109012 | Default staff phone response. |
| `audio/Voicemails/Patricia_Voicemail.mp3` | 139951 | Patricia phone response. |
| `audio/Voicemails/Tony_Voicemail.mp3` | 315076 | Tony phone response and state trigger. |

### TV Assets

Images:

| Path | Dimensions | Bytes |
| --- | ---: | ---: |
| `tv/images/crt_off.png` | 1366x768 | 384927 |
| `tv/images/crt_on.png` | 1366x768 | 917477 |
| `tv/images/Dial_1.png` | 61x62 | 7015 |

Video/audio files:

| Path | Bytes | Use |
| --- | ---: | --- |
| `tv/images/tv_static_small.mp4` | 1334631 | Static video. |
| `tv/images/tv-static-323620.wav` | 1342364 | Static audio. |
| `tv/images/PSA_small.mp4` | 21400205 | Millfield PSA. |
| `tv/images/PSA_Audio.mp3` | 2502781 | Millfield PSA audio. |
| `tv/images/Cartoon1mp4.mp4` | 8903755 | Balloon Land channel video. |
| `tv/images/cartoon_audio.mp3` | 7796299 | Actual cartoon audio asset, but not referenced by `sketch.js`. |
| `tv/images/camel_ad.mp4` | 5144999 | Camel ad channel video. |
| `tv/images/camel_ad_audio.mp3` | 726733 | Camel ad audio. |
| `tv/images/car.mp4` | 7239109 | Car commercial video. |
| `tv/images/car_audio.mp3` | 1038456 | Car commercial audio. |
| `tv/images/deoderant.mp4` | 7865951 | Deoderant ad video. |
| `tv/images/deoderant_audio.mp3` | 1110016 | Deoderant ad audio. |
| `tv/images/channelclick.wav` | 20684 | Channel display/dial sound. |
| `tv/images/old-radio-button-click-97549.mp3` | 26749 | Power click sound. |

Fonts:

- `tv/font/DS-DIGI.TTF`
- `tv/font/DS-DIGIB.TTF`
- `tv/font/DS-DIGII.TTF`
- `tv/font/DS-DIGIT.TTF`
- `tv/font/DIGITAL.TXT`

`DIGITAL.TXT` identifies DS-Digital as a shareware font by Dusit Supasawat and includes registration/payment language.

## PDF Asset

File:

- `assets/University_of_Texas_Academic_Summary.pdf`

Git state:

- Untracked at audit time.

Technical details:

- PDF 1.4.
- Generated by ReportLab.
- 4 pages.
- Contains an unofficial University of Texas at Austin academic summary.

Extracted identity fields:

- EID: `HP9946`
- Name: `PORTER, HAYDEN`
- School: Fine Arts.
- Major: Arts and Entertainment Technologies.
- First semester enrolled: Fall 2023.
- Last semester enrolled: Spring 2026.
- Classification: Senior.

Extracted academic summary:

- Total hours transferred: 12.
- Total hours taken: 78.
- Overall hours: 87.00.
- Overall GPA hours: 69.00.
- Overall grade points: 276.00.
- Overall GPA: 4.0000.
- Lower division GPA: 4.0000.
- Upper division GPA: 4.0000.

Courses visible in extracted text include:

- EDP 310 College Success.
- RHE 309J Composition 2.
- M 301 College Algebra.
- SOC 302 Sociology.
- UGS 302 Chinese Pol/Society in Film.
- AET 304 Foundations of Art/Entertainment Tech.
- AET 319 Art & Content.
- AET 319 Sound & Space.
- RHE 306 Rhetoric and Writing.
- PSY 301 Introduction to Psychology.
- HIS 301J Globalization: A Modern History.
- GEO 302P Sustaining a Planet.
- ECO 301 Introduction to Economics.
- CH 301N Chemistry in Our World I.
- GOV 312L Issues & Policies in American Government.
- AET 310 Foundations of Creative Coding.
- AET 319 Design & Interactivity.
- AET 319 Media & Technology.
- ADV 318J Intro to Integrated Brand Communication.
- NTR 306 Fundamentals of Nutrition.
- M 302 Introduction to Mathematics.
- ADV 319 Psychology of Advertising.
- AET 339 Advanced Game Audio.
- AET 337N Introduction to Narrative.
- HIS 315L The United States Since 1865.
- ADV 378 Digital Social Media Analytics.
- AET 330T History of Animation.
- HIS 315K The United States, 1492-1865.
- AET 334K Video Game Prototyping.
- ACC 310F Foundations of Accounting.
- AET 324D Principles of Animation.
- AET 330T Critical Theory for Content.
- AET 334C Level Design.
- AET 330T Exploring User Interaction.
- AET 358 Indie Game Studio.

Privacy audit note:

- This appears to contain real-looking personally identifying academic information and is not referenced by the public site files found during audit. Because it is untracked, it may have been added accidentally.

## Narrative and Interaction Flow

Primary player/user path:

1. Visit the county site.
2. Read public news, including school closure, password habits, Tony's opening, and Palimpsest articles.
3. Discover Staff Login in the injected footer.
4. Infer Daniel Harper admin credentials:
   - `dharper@millfieldcounty.gov`
   - `harper0824`
5. Enter admin dashboard.
6. Read mail.
7. Find restricted record credentials:
   - `dharper_io`
   - `Record$_0103!`
8. Enter Records Office restricted access.
9. Follow RG-02-011 to PD-02-041.
10. Read missing/unverified student case and family statements.
11. Read Karen Whitlock interview.
12. Visit Tony's Pizza.
13. Open Order Now, dial Tony's number `5550143270`.
14. Tony voicemail plays and sets `localStorage.tonysCalled = "true"`.
15. Return to homepage/news and see Tony disappearance promoted.
16. Optionally explore CRT TV in `/tv/`, including the Millfield PSA channel.

## Technical Risks and Issues Found

### Client-Side Authentication Only

Both admin and restricted-records systems are client-side only. The credentials and hashes are present in static JavaScript or exposed by in-world content.

Impact:

- Fine for a puzzle/narrative site.
- Not suitable for real access control.

### Direct Dashboard Access

`admin-dashboard.html` does not check whether the login page was completed.

Impact:

- Anyone can open `admin-dashboard.html` directly.

### Missing TV Audio Reference

`tv/sketch.js` references:

- `tv/images/Balloon_Audio.mp3`

Actual likely intended file:

- `tv/images/cartoon_audio.mp3`

Impact:

- Balloon Land / channel 4 audio likely does not play.

### Missing CSS Dial Background

`tv/style.css` references:

- `tv/images/dial.png`

Actual visible dial:

- `tv/images/Dial_1.png`

Impact:

- Likely harmless because `#dial-1` is an image element.

### Diagnostic Console Logging

`tv/sketch.js` contains many console diagnostics for video loading/playback.

Impact:

- Useful during development.
- Noisy in production.

### Repeated Inline CSS

Record pages and article pages repeat inline CSS blocks.

Impact:

- Makes visual maintenance harder.
- A shared record/article stylesheet would reduce duplication.

### Nonstandard CSS Zoom

The main site relies on `zoom`, which is nonstandard outside Chromium-like engines.

Impact:

- Possible inconsistent scaling across browsers.

### State Persistence

Tony's call state is stored in `localStorage`.

Impact:

- The changed news state persists until the user clears storage or manually removes `tonysCalled`.

### Session Path Dependencies

Restricted record progression uses `sessionStorage`.

Impact:

- Opening protected child records in a new tab/session may send users back to fallback pages.
- Refreshing within same session is fine.

### Possible Continuity Differences

Observed differences:

- County contact page says Millfield, MA.
- Tony's Pizza page says Millfield, IL.
- Public staff titles differ from internal intranet titles.

Impact:

- Could be intentional story texture or unintentional continuity drift.

## File-by-File Purpose Map

Root HTML:

- `index.html`: public homepage and carousel.
- `departments.html`: department cards and Records Office entry.
- `news.html`: public news archive.
- `calendar.html`: calendar shell.
- `staff.html`: staff directory grid.
- `contact.html`: county contact page.
- `records-office.html`: records archive page 1.
- `records-office-page2.html`: records archive page 2.
- `records-office-page3.html`: records archive page 3.
- `records-office-page4.html`: records archive page 4 and key restricted record links.
- `records-restricted-access.html`: restricted records sign-in.
- `admin-login.html`: admin portal login.
- `admin-dashboard.html`: Daniel Harper intranet dashboard.
- `tonys-pizza.html`: Tony's Pizza microsite and dialer popup.

Root JS/CSS:

- `calendar.js`: full-year 2002 weekly calendar renderer and event data.
- `admin.js`: admin login, intranet data, mail client, directory, archive, forms, work orders, policies, calendar.
- `admin.css`: admin/intranet visual styling.

Scripts:

- `scripts/millfield.js`: shared county nav/footer, carousel, news mutation.
- `scripts/restricted-records.js`: restricted records auth and path gating.
- `scripts/tonys.js`: Tony site image fallback and phone dialer.

Styles:

- `styles/millfield.css`: main county site design and calendar styles.
- `styles/restricted-records.css`: restricted login/record detail styles.
- `styles/tonys.css`: Tony's Pizza design and phone popup styles.

Articles:

- `articles/community-meeting-draws-residents-to-town-hall.html`
- `articles/county-officials-encourage-stronger-password-habits.html`
- `articles/local-student-makes-indie-game.html`
- `articles/middle-school-schedule.html`
- `articles/millfield-elementary-students-prepare-spring-art-showcase.html`
- `articles/owner-of-recently-opened-restaurant-unreachable.html`
- `articles/sorry-404.html`
- `articles/tonys-pizza-opening.html`

Profiles:

- `profiles/daniel-harper.html`
- `profiles/elaine-mercer.html`
- `profiles/emily-cross.html`
- `profiles/janice-bell.html`
- `profiles/margaret-voss.html`
- `profiles/mark-ellison.html`
- `profiles/patricia-boone.html`
- `profiles/thomas-weller.html`

Record pages:

- `record-1976-budget-report.html`
- `record-1977-school-zoning.html`
- `record-1984-facilities-summary.html`
- `record-1985-transportation-review.html`
- `record-1999-facilities-access-card-replacement-plan.html`
- `record-2002-april-28-police-report.html`
- `record-2002-bell-family-statement.html`
- `record-2002-karen-whitlock-interview.html`
- `record-2002-keller-family-statement.html`
- `record-2002-ramirez-family-statement.html`
- `record-2002-student-pickup-area-incident-report.html`
- `record-2002-traffic-post-assignment-notes.html`
- `record-2002-visitor-screening-procedure-draft.html`
- `record-2002-whitlock-family-statement.html`

TV:

- `tv/index.html`: CRT UI shell.
- `tv/style.css`: CRT layout, video sizing, dial/channel styles.
- `tv/sketch.js`: CRT state, channel rotation, audio/video switching.
- `tv/.gitattributes`: text normalization.
- `tv/font/*`: DS-Digital fonts and license/readme.
- `tv/images/*`: CRT images, dial, videos, ads, audio.

## Final Audit Takeaway

The project is best understood as a static-fiction web artifact with puzzle mechanics. Its public surface is a calm county website, while its hidden structure points to suppressed school incidents, missing children whose records vanish, staff messaging control, restricted archive access, Tony Sicero's later disappearance, and an atmospheric Palimpsest meta-layer.

From an engineering perspective, the project is coherent and runnable as static files, but its authentication and restricted access are intentionally theatrical rather than secure. The main actionable cleanup items are the missing TV audio path, the likely unused/untracked personal PDF, duplicate inline CSS, and the noisy TV diagnostics.
