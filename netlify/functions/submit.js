const fetch = require("node-fetch");

exports.handler = async (event) => {
  try {
    const { Email, referral_code, referer_code } = JSON.parse(event.body);

    const airtableApiKey = process.env.AIRTABLE_API_KEY;
    const baseId = process.env.AIRTABLE_BASE_ID;
    const tableName = process.env.AIRTABLE_TABLE_NAME;

    const airtableResponse = await fetch(`https://api.airtable.com/v0/${baseId}/${tableName}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${airtableApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: {
          Email,
          ReferralCode: referral_code,
          RefererCode: referer_code,
        },
      }),
    });

    const result = await airtableResponse.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, result }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
};