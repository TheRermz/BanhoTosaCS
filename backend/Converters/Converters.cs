using System;
using System.Text.Json;
using System.Text.Json.Serialization;

// This file contains custom JSON converters for DateOnly and TimeOnly types.
namespace banhotosa.Converters;

public class DateOnlyJsonConverter : JsonConverter<DateOnly>
{
    private readonly string _format = "yyyy-MM-dd";

    public override DateOnly Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        var s = reader.GetString();
        if (DateOnly.TryParseExact(s, _format, null, System.Globalization.DateTimeStyles.None, out var date))
        {
            return date;
        }
        throw new JsonException($"Invalid date format. Expected format: {_format}");
    }

    public override void Write(Utf8JsonWriter writer, DateOnly value, JsonSerializerOptions options)
    {
        writer.WriteStringValue(value.ToString(_format));
    }
}

public class TimeOnlyJsonConverter : JsonConverter<TimeOnly>
{
    private readonly string _format = "HH:mm:ss";

    public override TimeOnly Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        var s = reader.GetString();
        if (TimeOnly.TryParseExact(s, _format, null, System.Globalization.DateTimeStyles.None, out var time))
        {
            return time;
        }
        throw new JsonException($"Invalid time format. Expected format: {_format}");
    }

    public override void Write(Utf8JsonWriter writer, TimeOnly value, JsonSerializerOptions options)
    {
        writer.WriteStringValue(value.ToString(_format));
    }
}
