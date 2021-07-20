// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {FormattedMessage} from 'react-intl';
import {Link} from 'react-router-dom';

import FormattedMarkdownMessage from 'components/formatted_markdown_message.jsx';

export default function Messaging(): JSX.Element {
    return (
        <div>
            <h1 className='markdown__heading'>
                <FormattedMessage
                    id='help.messaging.title'
                    defaultMessage='Messaging Basics'
                />
            </h1>
            <hr/>
            <p>
                <FormattedMarkdownMessage
                    id='help.messaging.write'
                    defaultMessage='**Write Messages:** Use the text input box at the bottom of the Mattermost interface to write a message. Press ENTER to send the message. Use SHIFT+ENTER to create a new line without sending a message.'
                />
            </p>
            <p>
                <FormattedMarkdownMessage
                    id='help.messaging.reply'
                    defaultMessage='**Reply to Messages:** Select the **Reply Arrow** icon next to the text input box.'
                />
            </p>
            <p>
                <img
                    src='https://docs.mattermost.com/_images/reply-icon.png'
                    alt='Reply Arrow icon'
                    className='markdown-inline-img'
                />
            </p>
            <p>
                <FormattedMarkdownMessage
                    id='help.messaging.notify'
                    defaultMessage='**Notify Teammates:** Type `@username` to get the attention of specific team members.'
                />
            </p>
            <p>
                <FormattedMarkdownMessage
                    id='help.messaging.format'
                    defaultMessage='**Format Your Messages:** Use Markdown to include text styling, headings, links, emoticons, code blocks, block quotes, tables, lists, and in-line images in your messages.'
                />
            </p>
            <p>
                <img
                    src='https://docs.mattermost.com/_images/messagesTable1.png'
                    alt='Use Markdown in your messages'
                    className='markdown-inline-img'
                />
            </p>
            <p>
                <FormattedMarkdownMessage
                    id='help.messaging.emoji'
                    defaultMessage={'**Add Emoji:** Type ":" to open an emoji autocomplete. If the existing emojis don\'t say what you want to express, you can also create your own [Custom Emoji](!https://docs.mattermost.com/messaging/using-emoji.html#creating-custom-emojis).'}
                />
            </p>
            <p>
                <FormattedMarkdownMessage
                    id='help.messaging.attach'
                    defaultMessage='**Attach Files:** Drag and drop files into Mattermost, or select the **Attachment** icon in the text input box.'
                />
            </p>
            <p className='links'>
                <FormattedMessage
                    id='help.learnMore'
                    defaultMessage='Learn more about:'
                />
            </p>
            <ul>
                <li>
                    <Link to='/help/composing'>
                        <FormattedMessage
                            id='help.link.composing'
                            defaultMessage='Composing Messages and Replies'
                        />
                    </Link>
                </li>
                <li>
                    <Link to='/help/mentioning'>
                        <FormattedMessage
                            id='help.link.mentioning'
                            defaultMessage='Mentioning Teammates'
                        />
                    </Link>
                </li>
                <li>
                    <Link to='/help/formatting'>
                        <FormattedMessage
                            id='help.link.formatting'
                            defaultMessage='Formatting Messages Using Markdown'
                        />
                    </Link>
                </li>
                <li>
                    <Link to='/help/attaching'>
                        <FormattedMessage
                            id='help.link.attaching'
                            defaultMessage='Attaching Files'
                        />
                    </Link>
                </li>
                <li>
                    <Link to='/help/commands'>
                        <FormattedMessage
                            id='help.link.commands'
                            defaultMessage='Executing Commands'
                        />
                    </Link>
                </li>
            </ul>
        </div>
    );
}
